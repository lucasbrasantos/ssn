import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { ForumContext } from '../../context/ForumContext';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';


const ForumBlock = (props) => {
	 
	const {setSelectedComponent} = useComponentContext();
	const {dispatch} = useContext(ForumContext)
	
	const forumId = props.data.forumid;	
	
	const handleForumClick = async() => {
		
		const userForumId = `${props.user.firebase}_${forumId}`; // firebase uid + forum id

		try {
			const res = await getDoc(doc(db, "forumChats", userForumId)); 

			if (!res.exists()) { // se nao existir
				
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

	//////////


	const [forumLikes, setForumLikes] = useState(props?.likes);

	const getLikesFromAPI = async () => {
		try {
			const res = await axios.get(`http://localhost:3000/forum_likes/${forumId}`);
			// console.log(res);
			setForumLikes(res.data[0].likes); // Update the like count from the API
		} catch (error) {
			console.error(error);
		}
	};
	
	useEffect(() => {
		getLikesFromAPI(); // Fetch the initial like count when component mounts
	}, []);


	const likedForuns = JSON.parse(localStorage.getItem('likedForuns')) || [];

	const likeForum = async(event) => { // like icon click
		event.stopPropagation()
		
		try {
			const res = await axios.get(`http://localhost:3000/forum_likes/${forumId}`);
			const recentLikes = res.data[0].likes;
		
			let updatedLikes = recentLikes;
			if (!likedForuns.includes(forumId)) { // if current post is NOT liked
				updatedLikes = recentLikes + 1;
				
				likedForuns.push(forumId); //this post has been liked
				localStorage.setItem('likedForuns', JSON.stringify(likedForuns)); // add post to localStorage 
				
			}else{
				updatedLikes = recentLikes - 1;

				likedForuns.splice(likedForuns.indexOf(forumId), 1);
				localStorage.setItem('likedForuns', JSON.stringify(likedForuns));
			}
			
			setForumLikes(updatedLikes);
			handleForumtLikeUpdate(forumId, updatedLikes)
		}
		catch (error) {
			console.error("Error updating likes:", error);
		}
	}

	const handleForumtLikeUpdate = (forumId, updatedLikes) => {

		axios.patch(`http://localhost:3000/like_forum/${forumId}`, {
			likes: updatedLikes
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		})

	};
	
	const likeIcon = document.getElementById(`likeIcon_${forumId}`);
	if (likeIcon) {
		if (likedForuns.includes(forumId)) {
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart_red.svg';
		} else {
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart.svg';
		}
	}

	
	return (
		<div id='Forum' onClick={() => handleForumClick()}>
			
			<h1 className='forumName'>{props.title}</h1>

			<div className="userInfo">
				<img src={props.user?.photourl || '../../../src/assets/Icon.png'} alt="" />
				<div>
					<p className='username'>{`${props.user.username} | ${props.user.name}`}</p>
					<p className='timePosted'>{props.created_at}</p>
				</div>
			</div>

			<div className="forumInfo">
				<p>Descrição:</p><br />
				<p>{props.description}</p>
			</div>

			<div className="tag">{props.tag}</div>
			<span className='likes' ><img onClick={(e) => likeForum(e)} id={`likeIcon_${forumId}`} src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{forumLikes}</span>
		</div>
	)
}

export default ForumBlock