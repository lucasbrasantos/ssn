import React, { useContext, useEffect, useState } from 'react'

import './style.scss'
import Chat2 from '../Chats/Chat2'
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';


const ChatRecent = () => {

    const {setSelectedComponent} = useComponentContext();
    const {currentUser} = useContext(AuthContext);

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

    const [chats, setChats] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

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


    const filteredChats = chats
    ? Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.filter((chat) =>
          chat[1].userInfo.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];    
    
    return (
        <div id='ChatRecent' className='chat'>
            
            <div className="toggleChat toggleChatTop">
                <p onClick={() => handleButtonClick('chatAll')}>Todos</p>
				<hr />
				<h1 onClick={() => handleButtonClick('chatRecent')}>Recentes</h1>
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

            {

                filteredChats && filteredChats.length > 0 ? (
                    filteredChats.map((chat, key) => <Chat2 chat={chat[1]} key={key} />)
                ) : (
                    <p className='noData' style={{color:'white', padding:'20px 0'}}>Nenhum usuário encontrado</p>
                )

            }

            
        </div>
    )
}

export default ChatRecent