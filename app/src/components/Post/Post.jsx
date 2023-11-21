import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { Timestamp, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useComponentContext } from '../../context/ComponentContext';
import { SelectedUserContext } from '../../context/SelectedUserContext';
import Swal from 'sweetalert2';
import { v4 as uuid } from "uuid";
import { CommentContext } from '../../context/CommentContext';
import PostComments from './PostComments';

const Post = ({postData, postId}) => {

	const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState();	

	useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async() => {

		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  	})
		.then((res) => { setCurrentUserAPI(res.data[0]) })
		.catch((err) => { console.error(err); });		
	}


	const [post, setPost] = useState(postData.post);
	const [user, setUser] = useState(postData?.user);
	const [comment, setComment] = useState(postData?.comment);

	useEffect(() => {
		if (postData) {
			setUser(postData.user);
			setComment(postData.comment);
		}
	}, [postData]);
	
	// console.log(props);
	// console.log(props.postData);
	
	const [isCommentsOpen, setIsCommentsOpen] = useState(false)
	
	const toggleComment = () => {

		setIsCommentsOpen(!isCommentsOpen);
		// console.log(isCommentsOpen);
	}

	//////////

	// const [postLikes, setPostLikes] = useState(post.likes);
	
	function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}
	
	const [postLikes, setPostLikes] = useState(post?.likes);
	const [liked, setLiked] = useState(false)
	
	
	useEffect( () => {
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'posts');

		const unSub = onSnapshot(query(likesCollectionRef), (doc) => {
			const _liked = doc.data()['_'+ postId]?.liked
			setLiked(_liked);
			changeLikeIcon(_liked);
		})

		return() => {
			unSub();
		}

	
	}, [postId])
	
	useEffect( () => {

		const combinedId = `_id${postId}_usr${user?.userid}`;
		const postDocRef = doc(db, "posts", combinedId);

		const unSub = onSnapshot(query(postDocRef), (doc) => {
			
			if (doc.exists()) {
				const _likes = doc.data()[combinedId]?.postInfo.likes
				setPostLikes(_likes);
			}
		})

		return() => {
			unSub();
		}

	
	}, [user?.userid, postId])
	

	const updateLikesCount = async(event, postId, postLikes) => {
		event.stopPropagation()

		// console.log(postId);
		// console.log(postLikes);
		
		const combinedId = `_id${postId}_usr${user.userid}`;

		const postDocRef = doc(db, "posts", combinedId);
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'posts');
		
		
		const res = await getDoc(likesCollectionRef);
		const res2 = await getDoc(postDocRef);
		
		// console.log(res.data());
		// console.log(res2);

		
		const likesDocData = res.data();

		
		if (!res2.exists()) { // se nao existir o documento
			
			await setDoc(postDocRef, {}); // criar
		}

		if (!res.exists()) { // se nao existir o documento
			
			await setDoc(likesCollectionRef, {}); // criar
		}

		
		
		if (!likesDocData || !likesDocData['_'+postId]) {
			
			await updateDoc(likesCollectionRef, {
				['_'+postId]: {
					liked: true,
				},
			});
	
			await updateDoc(postDocRef, {
				[combinedId+'.postInfo.likes']: postLikes+1,
			});
			setPostLikes(postLikes+1)

			axios.patch(`http://localhost:3000/like_post/${postId}`, {
				likes: postLikes + 1
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			})

		}else{ // senao ele ja foi criado e ja foi curtido...

			let vigia = likesDocData['_'+postId].liked // inical value = true

			await updateDoc(likesCollectionRef, {
				['_'+postId]: {
					liked: !vigia,
				},
			});
	
			
			await updateDoc(postDocRef, {
				[combinedId+'.postInfo.likes']: !vigia ? postLikes+1 : postLikes-1,
			});

			axios.patch(`http://localhost:3000/like_post/${postId}`, {
				likes: !vigia ? postLikes + 1 : postLikes - 1
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			})

			!vigia ? setPostLikes(postLikes+1) : setPostLikes(postLikes-1);
			

			changeLikeIcon(!vigia)
			
		}
		
	}

	const changeLikeIcon = (isLiked) => {
		const likeIcon = document.getElementById(`likeIcon_${post.postid}`)
		if (isLiked) {
			// console.log('tá curtido');
			
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart_red.svg';
		}else{
			// console.log('não tá curtido');
			
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart.svg';
		}
	}


	//////////////

	const {setSelectedComponent} = useComponentContext();
	const {dispatch} = useContext(SelectedUserContext)
	

	const handleChangeComponent = (component) => {
		setSelectedComponent(component)
	}

	const handleUserClick = () => {

		dispatch({type:"SELECT_USER", payload:{
			userId: user && user.userid
		}})

		handleChangeComponent('userProfile')
	}


	//////////////////

	// post comments //

	const [text, setText] = useState('');
	const {dispatchComment} = useContext(CommentContext)


	const handleKey = (e) => {
		
		if (e.key === 'Enter') {
			if (text.trim() === '') {
				e.preventDefault(); // Prevent default behavior of submitting the form on Enter press
	
				Swal.fire({
					title: 'Erro!',
					text: "Por favor, escreva algo antes de enviar.",
					icon: 'error',
					confirmButtonText: 'Retornar',
					timer: 2000,
					timerProgressBar: true,
				});
			} else {
				handleSendComment();
			}
		}
		
	}

	const handleSendComment = async() => {
	 
		

		if (text.trim() == '') {
			
			Swal.fire({
				title: 'Erro!',
				text: "Por favor, escreva algo antes de enviar.",
				icon: 'error',
				confirmButtonText: 'Retornar',
				timer: 2000,
				timerProgressBar: true,
			})
			
		}else{

			const messageId = uuid();  // id da mensagem
			const _postId = `_${postId}`;

			console.log(postId);
			
			const res = await getDoc(doc(db, "postComments", _postId)); 
			

			if (!res.exists()) {
				
				await setDoc(doc(db, "postComments", `${_postId}`), {});

				handleSendComment()

			}else{

				
				await setDoc(doc(db, "postComments", _postId, "messages", messageId), {
					id: messageId, // id da mensagem
					text,
					senderId: currentUser.uid,
					senderUsername: currentUser.displayName,
					// senderName: data.forumBlock.user.name,
					senderPhotoUrl: currentUser.photoURL,
					date:Timestamp.now(),
				});
				
				setText("");


				dispatchComment({type:"CHANGE_COMMENT", payload:{
					_postId: _postId,
				}})

			}

		}
	}




	useEffect( () => {
	
		const unSub = onSnapshot(query(collection(db, "postComments", `_${postId}`, "messages"), orderBy("date")), (doc) => {
			const messages = doc.docs.map((doc => doc.data()))
			setComment(messages).length;
		})

		return() => {
			unSub();
		}

	
	}, [postId])


	return (
		
		<div className='postAll'>
			
			{post && user ? (
				<div className='postContainer' id='postContainer'>

					<div className='postTop'>
						<div className='userPostInfo' onClick={() => handleUserClick(user?.userid)} style={{display:'flex', cursor:'pointer', flexDirection:'row', alignItems:'center', gap:'10px'}}>
							<img className="postAvatar" src={user ? user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />
							<p>{`${user?.name} | ${user?.username}` || 'usuario'}</p>
						</div>

					</div>
					
						<p id='postTitle'>
							{post.title}
						</p>
					<div className='postImg'>
						<img src={post.photourl  || "../../../src/assets/sampleImg.png"} alt="" />
						{/* <video src={post.photourl  || "../../../src/assets/sampleImg.png"} alt="" /> */}
					</div>
					<div className='postBottom'>
						<div className='btn1'>
							<img onClick={(e) => updateLikesCount(e, postId, postLikes)} id={`likeIcon_${post.postid}`} className='likeIcon' src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
							<p className='statusbtn'>{postLikes}</p>
							<img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" id='commentsIcon' onClick={() => toggleComment()} />
							{
								comment !== null && (Array.isArray(comment)) ?
									<p className='statusbtn'>{comment.length}</p> :
								comment !== null && !Array.isArray(comment) ?
									<p className='statusbtn'>1</p> : ''
								
							}
							<img style={{marginBottom:"6px"}} src="../../../src/assets/icons/fluent-mdl2_share.png" alt="" />
						</div>
						<div style={{marginRight:"25px"}}>
						<img src="../../../src/assets/icons/fluent-mdl2_more-vertical.png" alt="" />
						</div>
					</div>
					
				</div>
			) : <p style={{color:'white'}}>Loading...</p>}
			
			{

				isCommentsOpen && (

					<div className='comments'>

						<PostComments _postId={`_${postId}`}/>
					
						<div className="PostBottomChat">
							<input id="sendInput" type="text" onKeyDown={handleKey} onChange={(e) => {setText(e.target.value)}} value={text} />
							<input style={{display:'none'}} type="file" id='file'/>
				
				
							<img src="../../../src/assets/icons/fluent-mdl2_send.svg" alt="" onClick={() => {handleSendComment()}}/>
						</div>				
					</div>

				)
			}

		</div>
		
	)
}

export default Post