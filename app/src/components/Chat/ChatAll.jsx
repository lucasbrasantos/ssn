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

	const [searchTerm, setSearchTerm] = useState('');


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
	
	const filteredSearchData = mergedData
    ? mergedData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];


	// console.log(filteredSearchData);

	return (
		<div id='ChatAll' className='chat'>

			<div className="toggleChat toggleChatTop">
                <h1 onClick={() => handleButtonClick('chatAll')}>Todos</h1>
				<hr />
				<p onClick={() => handleButtonClick('chatRecent')}>Recentes</p>
            </div>
			
			<span className='searchSpan'>
				<input
					name='search'
					className='search'
					type='text'
					placeholder='Pesquisar...'
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</span>

			<div className="chats">

			{	
				
				(filteredSearchData && filteredSearchData.length > 0) ? (

					filteredSearchData.map((e, key) => (
					  <Chat key={e.userid} data={e} imgUrl={e.photourl} username={e.username} />
					))

				) : (
					<p className='noData' style={{color:'white', padding:'20px 0'}}>Nenhum usuário encontrado</p>
				)

			}
			</div>
			

		</div>
	)
}

export default ChatAll