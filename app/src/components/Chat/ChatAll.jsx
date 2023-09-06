import React from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';

import Chat from '../Chats/Chat';
import Chat2 from '../Chats/Chat2';

const ChatAll = () => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


	return (
		<div id='ChatAll' className='chat'>
			<h1>todos</h1>

			<Chat/>
			<Chat/>
			<Chat/>
			

			<div className="toggleChat">
                <p onClick={() => handleButtonClick('chatAll')}>Todos</p>
				<hr />
				<p onClick={() => handleButtonClick('chatRecent')}>Recentes</p>
            </div>
		</div>
	)
}

export default ChatAll