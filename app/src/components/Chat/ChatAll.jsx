import React, { useContext, useEffect, useState } from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';

import Chat from '../Chats/Chat';
import Chat2 from '../Chats/Chat2';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const ChatAll = () => {

	const {currentUser} = useContext(AuthContext);
	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const [users, setUsers] = useState([])
	const [chats, setChats] = useState([])

	useEffect(() => {
		fetchData()
	}, []);

	const fetchData = async() => {
		
		await axios.get('http://localhost:3000/users')
		.then((res) => {
		  setUsers(res.data);
		})
		.catch((err) => {
		  console.error(err);
		});
	}

	const newUsers = users ? users.filter(user => user.firebase !== currentUser.uid) : []
	

	useEffect(() => {
		const getChats = () => {
			
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {			
				setChats(doc.data());
	
			});
		
			return() => {
				unsub()
			};			
		}

		currentUser.uid && getChats();

	}, [currentUser.uid]);

	
	
	const mergedDataApiFirebase = (newUsers, chats) => {
		const mergedUsers = newUsers && chats ? newUsers.map(user => {
			const userChat = Object.entries(chats)?.find(chatUser => chatUser[1].userInfo.uid === user.firebase);
			if (userChat) {
				return { ...user, chatUID:userChat[0], chatInfo:userChat[1] };
			} else {
				return user;
			}
		}) : [];
	
		return mergedUsers;
	};

	const mergedData = mergedDataApiFirebase(newUsers, chats);
	

	return (
		<div id='ChatAll' className='chat'>
			<h1>todos</h1>

			<div className="chats">

			{	
				
				mergedData && mergedData.map((e, key) => {
					
					return (
						
						<Chat
						key={key}
						data={e}
						imgUrl={e.photourl}
						username={e.username}
						/>
					)
				})

			}
			</div>
			

			<div className="toggleChat">
                <p onClick={() => handleButtonClick('chatAll')}>Todos</p>
				<hr />
				<p onClick={() => handleButtonClick('chatRecent')}>Recentes</p>
            </div>
		</div>
	)
}

export default ChatAll