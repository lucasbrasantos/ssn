import React, { useContext } from 'react'
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { ForumContext } from '../../context/ForumContext';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


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

				await setDoc(doc(db, "forumChats", userForumId), { messages: [] });
				

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
			<span className='likes' ><img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{props.likes}</span>
		</div>
	)
}

export default ForumBlock