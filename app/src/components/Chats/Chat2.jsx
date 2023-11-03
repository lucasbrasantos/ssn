import React, { useContext } from 'react'

import './style.scss'
import { ChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const Chat2 = (props) => {
	
	const chatInfo = props.chat && props.chat.userInfo ? props.chat : ''
	const user = chatInfo?.userInfo

	// console.log(chatInfo);
	// console.log(user);

	const {dispatch} = useContext(ChatContext);
	const {currentUser} = useContext(AuthContext);
	
	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const handleChatClick = async() => {

		handleSelect({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL
		});
		
		handleButtonClick('chatUser')
	}


	const handleSelect = (u) => {
		dispatch({type:"CHANGE_USER", payload:u})
		
	}

	return (
		<div id='Chat2' onClick={() => handleChatClick()}>
			<img src="../../../src/assets/IconDark.png" alt="" />
			<div className="box">
				<p className='username'>{chatInfo.userInfo.displayName}</p>
				<p className='lastMessage'>{chatInfo.lastMessage?.text}</p>
			</div>

			<button>conversar</button>	

		</div>
	)
}

export default Chat2