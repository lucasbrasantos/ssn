import React from 'react'

import './style.scss'


const Chat = (props) => {
	return (
		<div id='Chat'>
			<img src={props.imgUrl || '../../../src/assets/IconDark.png'} alt="" />
			<div className="box">
				<p className='username'>{props.username}</p>
				<p className='userInfo'>{props.userinfo}</p>
			</div>
			

		</div>
	)
}

export default Chat