import React from 'react'
import './style.scss'


const ForumBlock = () => {
	return (
		<div id='Forum'>
			
			<h1 className='forumName'>Forum name</h1>

			<div className="userInfo">
				<img src="../../../src/assets/Icon.png" alt="" />
				<div>
					<p className='username'>username</p>
					<p className='timePosted'>time posted</p>
				</div>
			</div>

			<div className="forumInfo">
				<p>descrição bolada do forum</p><br />
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem perspiciatis minus quos minima dolorum. Corporis ipsa pariatur quibusdam sed sit. Nihil aliquid cum odio accusantium ex architecto aspernatur vel dolorum.</p>
			</div>

			<div className="tag">tag top</div>
			<span className='likes' ><img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" /></span>
		</div>
	)
}

export default ForumBlock