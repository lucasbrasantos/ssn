import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

const Post = (props) => {
	
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


	const [post, setPost] = useState(props.postData?.post)
	const [user, setUser] = useState(props.postData?.user)
	const [comment, setComment] = useState(props.postData?.comment)
	
	// console.log(props);
	
	


	const [isCommentsOpen, setIsCommentsOpen] = useState(false)
	
	const toggleComment = () => {

		setIsCommentsOpen(!isCommentsOpen);
		// console.log(isCommentsOpen);
	}

	//////////

	const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
	const postId = post.postid;

	const likePost = () => {

		if (!likedPosts.includes(postId)) { // if current post is NOT liked
			
			setPost({ ...post, likes: post.likes + 1 });
			likedPosts.push(postId); //this post has been liked
			localStorage.setItem('likedPosts', JSON.stringify(likedPosts)); // add post to localStorage 

			handlePostLikeUpdate(postId, 1); // Add 1 like
			
		}else{

			setPost({ ...post, likes: post.likes - 1 });
			likedPosts.splice(likedPosts.indexOf(postId), 1);
			localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

			handlePostLikeUpdate(postId, -1); // Remove 1 like
		}

		console.log(post);
	}

	const handlePostLikeUpdate = (postId, like) => {

		axios.patch(`http://localhost:3000/like_post/${postId}`, {
			likes: post.likes + like
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		})

	};
	
	const likeIcon = document.getElementById(`likeIcon_${post.postid}`);
	if (likeIcon) {
		if (likedPosts.includes(postId)) {
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart_red.svg';
		} else {
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart.svg';
		}
	}


	function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}

	

	/*
	const [_users, set_Users] = useState([])
	const [_comment, set_Comment] = useState([])
	const [_posts, set_Posts] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async() => {
		await axios.get('http://localhost:3000/posts')
		.then(res => set_Posts(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/comment')
		.then(res => set_Comment(res.data))
		.catch(err => console.log(err))

		
		await axios.get('http://localhost:3000/users')
		.then(res => set_Users(res.data))
		.catch(err => console.log(err))
		
		
	}

	const dataWithComments  = posts.map((post) => { // e => element = each post in sorted posts
		const user = users.find(user => user.userid === comment.userid)
		const comments = _users.find(user => user.userid === comment.userid)

		return{
			post,
			comments: comments,
			user: user,
		}
	})

	console.log(commentWithUsers);

*/

	return (
		<div className='postAll'>
			<div className='postContainer' id='postContainer'>

				<div className='postTop'>
					<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
						<img className="postAvatar" src={user ? user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />
						<p>{user ? user.username : 'usuario'}</p>
					</div>
					
					{
						currentUserAPI && user && currentUserAPI.userid !== user.userid ? (
							<button className='followBtn'>Seguir</button>
						) : <></>

					}

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
						<img onClick={() => likePost()} id={`likeIcon_${post.postid}`} className='likeIcon' src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
						{post.likes > 0 &&
							<p className='statusbtn'>{post.likes}</p>
						}
						<img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" id='commentsIcon' onClick={() => toggleComment()} />
						{comment !== null && (Array.isArray(comment)) ?
							<p className='statusbtn'>{comment.length}</p> : ''
						}
						<img style={{marginBottom:"6px"}} src="../../../src/assets/icons/fluent-mdl2_share.png" alt="" />
					</div>
					<div style={{marginRight:"25px"}}>
					<img src="../../../src/assets/icons/fluent-mdl2_more-vertical.png" alt="" />
					</div>
				</div>
				
			</div>
			
			{
				isCommentsOpen && (

					<div className="comments" id='comments'>
						{
														
							comment !== null && (Array.isArray(comment)) ? ( // if comment is not null and is an array
								comment.map((c, key) => {

									return(
										<div className="commentBox" key={key}>
											<div>
												<img className='commentUserAvatar' src={c ? c.user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="userphoto" />
											</div>
											<div style={{marginRight:'47px'}}>
												<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
													<p>
														{c ? c.user.username : 'usuario'}
													</p>
													<p>{c ? formatDateToYYYYMMDD(c.timecommented) : 'data'}</p>
												</div>
												<p>
													{c ? c.comment : 'comment'}
												</p>
												{/*
												<div className='cmtBtn'>
													<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
														<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
														{post.likes > 0 &&
															<p className='statusbtn'>{post.likes}</p>
														}
													</div>
													<button>Responder</button>
												</div>
												*/}
											</div>
										</div>
									)
								})

							) : comment !== null && !Array.isArray(comment) ? ( // if comment is not null and not array of comments; so its an single comment
								<div className="commentBox">
									<div>
										<img className='commentUserAvatar' src={comment ? comment.user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="userphoto" />
									</div>
									<div style={{marginRight:'47px'}}>
										<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
											<p>{comment ? comment.user.username : 'usuario'}</p>
											<p>{comment ? formatDateToYYYYMMDD(comment.timecommented) : 'data'}</p>
										</div>
										<p>
											{comment ? comment.comment : 'comment'}
										</p>

										{/* 										
										<div className='cmtBtn'>
											<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
												<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
												{post.likes > 0 &&
													<p className='statusbtn'>{post.likes}</p>
												}
											</div>
											<button>Responder</button>
										</div> 
										*/}

									</div>
								</div>
							) : (
								<div className="commentBox">
									<p>no comments</p>
								</div>
							)
						} 
					</div>

				)
			}

		</div>
	)
}

export default Post