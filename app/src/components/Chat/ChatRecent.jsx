import React from 'react'

import './style.scss'
import Chat2 from '../Chats/Chat2'
import { useComponentContext } from '../../context/ComponentContext';


const ChatRecent = () => {

    const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

    
    return (
        <div id='ChatRecent' className='chat'>
            <h1>recentes</h1>

            <Chat2/>
            <Chat2/>
            <Chat2/>


            <div className="toggleChat">
                <p onClick={() => handleButtonClick('chatAll')}>Todos</p>
                <hr />
                <p onClick={() => handleButtonClick('chatRecent')}>Recentes</p>
            </div>
            
        </div>
    )
}

export default ChatRecent