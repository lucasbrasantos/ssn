import React from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';


const Chat = (props) => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	return (
		<div id='Chat' onClick={() => handleButtonClick('ChatUser')}>
			<img src={props.imgUrl || '../../../src/assets/IconDark.png'} alt="" />
			<div className="box">
				<p className='username'>{props.username}</p>
				<p className='userInfo'>{props.userInfo}</p>
			</div>
			

		</div>
	)
}

export default Chat