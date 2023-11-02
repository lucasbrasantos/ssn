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
    
    
    return (
        <div id='ChatRecent' className='chat'>
            
            <div className="toggleChat toggleChatTop">
                <h1 onClick={() => handleButtonClick('chatAll')}>Todos</h1>
				<hr />
				<p onClick={() => handleButtonClick('chatRecent')}>Recentes</p>
            </div>

            {

                Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat, key) => {

                    return <Chat2 chat={chat[1]} key={key}/>

                })

            }

            
        </div>
    )
}

export default ChatRecent