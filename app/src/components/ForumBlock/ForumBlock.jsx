import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { ForumContext } from '../../context/ForumContext';
import { doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const ForumBlock = (props) => {
	 
	const {setSelectedComponent} = useComponentContext();
	const {dispatch} = useContext(ForumContext)
	const {currentUser} = useContext(AuthContext);
	
	const forumId = props.data?.forumid;	
	const [userForumId_, setUserForumId_] = useState(`${props.user?.firebase}_${forumId}`)
	
	const handleForumClick = async() => {
		
		const userForumId = `${props.user?.firebase}_${forumId}`; // firebase uid + forum id

		try {
			const res = await getDoc(doc(db, "forumChats", userForumId)); 
			const res2 = await getDoc(doc(db, "foruns", userForumId)); 

			if (!res.exists() && !res2.exists()) { // se nao existir
				
				await setDoc(doc(db, "foruns", userForumId), {});  // depois de createForum.jsx mudar para "forumChats" tirar esse

				await setDoc(doc(db, "forumChats", userForumId), {});		
				

				await updateDoc(doc(db, "foruns", userForumId), {

					[userForumId+".forumInfo"]: {
						forumId: forumId,
						userid: props.user.firebase,
						username: props.user.username,
						photoURL: props.user.photourl,
						tag: props.tag,
						title: props.title,
						description: props.description,
						likes: props.likes
					},
					[userForumId+".date"]: serverTimestamp()
				});

			}

		} catch (error) {
			console.log(error);
		}
		

		handleSelect({
			userForumId: userForumId,
			forumBlock: props
		})

		handleChangeComponent('forumChat')
	}

	const handleChangeComponent = (component) => {
		setSelectedComponent(component)
	}

	const handleSelect = (u) => {
		dispatch({type:"CHANGE_FORUM", payload:u})
		
	}

	
	//////////////
	
	const [forumLikes, setForumLikes] = useState(props?.likes);
	const [liked, setLiked] = useState(false)
	
	
	useEffect( () => {
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'forumBlock');

		const unSub = onSnapshot(query(likesCollectionRef), (doc) => {
			const _liked = doc.data()[userForumId_]?.liked
			setLiked(_liked);
			changeLikeIcon(_liked);
		})

		return() => {
			unSub();
		}

	
	}, [userForumId_])

	useEffect( () => {
		const forumDocRef = doc(db, 'foruns', userForumId_);

		const unSub = onSnapshot(query(forumDocRef), (doc) => {
			const _likes = doc.data()[userForumId_]?.forumInfo.likes
			setForumLikes(_likes);
		})

		return() => {
			unSub();
		}

	
	}, [userForumId_])
	

	const updateLikesCount = async(event, userForumId, forumId, forumLikes) => {
		event.stopPropagation()

		const forumDocRef = doc(db, 'foruns', userForumId);
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'forumBlock');
		
		
		const res = await getDoc(likesCollectionRef);
		
		console.log(res.data());

		const likesDocData = res.data();

		if (!res.exists()) { // se nao existir o documento
			// If the user's 'likes' document doesn't exist, create it and add the likes
			await setDoc(likesCollectionRef, {}); // criar
		}

		

		if (!likesDocData || !likesDocData[userForumId]) {
			
			await updateDoc(likesCollectionRef, {
				[userForumId]: {
					liked: true,
				},
			});
	
			await updateDoc(forumDocRef, {
				[userForumId+'.forumInfo.likes']: forumLikes+1,
			});
			setForumLikes(forumLikes+1)

		}else{ // senao ele ja foi criado e ja foi curtido...

			let vigia = likesDocData[userForumId].liked // inical value = true

			await updateDoc(likesCollectionRef, {
				[userForumId]: {
					liked: !vigia,
				},
			});
	
			
			await updateDoc(forumDocRef, {
				[userForumId+'.forumInfo.likes']: !vigia ? forumLikes+1 : forumLikes-1,
			});

			!vigia ? setForumLikes(forumLikes+1) : setForumLikes(forumLikes-1);
			

			changeLikeIcon(!vigia)
			
		}
		
	}

	const changeLikeIcon = (isLiked) => {
		const likeIcon = document.getElementById(`likeIcon_${forumId}`)
		if (isLiked) {
			console.log('tá curtido');
			
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart_red.svg';
		}else{
			console.log('não tá curtido');
			
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
	
	return (
		<div id='Forum' onClick={() => handleForumClick()}>
			
			<h1 className='forumName'>{props.title}</h1>

			<div className="userInfo">
				<img src={props.user?.photourl || '../../../src/assets/Icon.png'} alt="" />
				<div>
					<p className='name' style={{fontWeight:'500'}} >{`${props.user?.name}`}</p>
					<p className='username' style={{fontSize:'.85rem',fontWeight:'300'}} >@{`${props.user?.username}`}</p>
					<p className='timePosted'>{formatDateToYYYYMMDD(props.created_at)}</p>
				</div>
			</div>

			<div className="forumInfo">
				<p>Descrição:</p><br />
				<p>{props.description}</p>
			</div>

			<div className="tag">{props.tag}</div>
			<span className='likes' ><img onClick={(e) => updateLikesCount(e, userForumId_, forumId, forumLikes)} id={`likeIcon_${forumId}`} src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{forumLikes}</span>
		</div>
	)
}

export default ForumBlock