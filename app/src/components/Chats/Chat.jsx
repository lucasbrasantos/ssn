import React, { useContext } from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';


const Chat = (props) => {

	const {currentUser} = useContext(AuthContext);
	const {dispatch} = useContext(ChatContext)

	const user = props.data
	const chatInfo = props.data && props.data.chatInfo ? props.data.chatInfo : ''
	// console.log(user);

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


	const handleChatClick = async() => {
		
		const combinedId = currentUser.uid > user.firebase
			? currentUser.uid + user.firebase
			: user.firebase + currentUser.uid

			try {
				const res = await getDoc(doc(db, "chats", combinedId));
	
				if (!res.exists()) { // se não existir um DOC ou 'chat' com os usuario ativo e o usuario do chat clicado
					
					//create a chat in chats collection
					await setDoc(doc(db, "chats", combinedId), { messages: [] });
				}
					//create user chats
					await updateDoc(doc(db, "userChats", currentUser.uid), {
	
						[combinedId+".userInfo"]: {
							uid: user.firebase,
							displayName: user.username,
							photoURL: user.photourl,
							userId: user.userid,
						},
						[combinedId+".date"]: serverTimestamp()
					});
	
					await updateDoc(doc(db, "userChats", user.firebase), {
	
						[combinedId+".userInfo"]: {
							uid: currentUser.uid,
							displayName: currentUser.displayName,
							photoURL: currentUser.photoURL,
							userId: user.userid,
						},
						[combinedId+".date"]: serverTimestamp()
					});
				

				
	
			} catch (error) {
				console.log(error);
			}

		handleSelect({
			uid: user.firebase,
			displayName: user.username,
			photoURL: user.photourl,
			userId: user.userid,
		});
		
		handleButtonClick('chatUser')
	}


	const handleSelect = (u) => {
		dispatch({type:"CHANGE_USER", payload:u})
		
	}


	return (
		<div id='Chat' onClick={() => handleChatClick()}>
			<img src={props.imgUrl || '../../../src/assets/IconDark.png'} alt="" />
			<div className="box">
				<p className='username'>@{props.username}</p>
				<p className='lastMessage'>{chatInfo.lastMessage?.text}</p>
			</div>
			

		</div>
	)
}

export default Chat