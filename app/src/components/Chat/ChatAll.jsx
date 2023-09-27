import React, { useEffect, useState } from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';

import Chat from '../Chats/Chat';
import Chat2 from '../Chats/Chat2';
import axios from 'axios';

const ChatAll = () => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const [data, setData] = useState([])

	useEffect(() => {
		
		axios.get('http://localhost:3000/users')
		.then((res) => {
		  setData(res.data);
		})
		.catch((err) => {
		  console.error(err);
		});
	  }, []);


	return (
		<div id='ChatAll' className='chat'>
			<h1>todos</h1>

			<div className="chats">

			{
				data.map((e) => (
					
					<Chat
					imgUrl={e.photourl}
					username={e.username}
					userInfo={e.description} // after, put the chat context, last message description
					/>
				))

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