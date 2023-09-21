import React from 'react'
import './style.scss'


const ForumBlock = (props) => {
	 

	return (
		<div id='Forum'>
			
			<h1 className='forumName'>{props.title}</h1>

			<div className="userInfo">
				<img src="../../../src/assets/Icon.png" alt="" />
				<div>
					<p className='username'>{props.username}</p>
					<p className='timePosted'>{props.created_at}</p>
				</div>
			</div>

			<div className="forumInfo">
				<p>Descrição:</p><br />
				<p>{props.description}</p>
			</div>

			<div className="tag">{props.tag}</div>
			<span className='likes' ><img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{props.likes}</span>
		</div>
	)
}

export default ForumBlock