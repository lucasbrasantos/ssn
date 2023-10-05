import React from 'react'
import './style.scss'

const Post = (props) => {
  return (
    <div className='postContainer'>

		<div className='postTop'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className="postAvatar" src={props.user_photo_url || "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />
				<p>{props.username || 'username'}</p>
			</div>
			<button className='followBtn'>Seguir</button>
		</div>
		
		<div className='postImg'>
		<p id='postTitle'>
				{props.title}
			</p>
			<img src={props.photo_url  || "../../../src/assets/sampleImg.png"} alt="" />
		</div>
		<div className='postBottom'>
			<div className='btn1'>
				<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
				{props.likes > 0 &&
					<p className='statusbtn'>{props.likes}</p>
				}
				<img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" />
				<img style={{marginBottom:"6px"}} src="../../../src/assets/icons/fluent-mdl2_share.png" alt="" />
			</div>
			<div style={{marginRight:"25px"}}>
			<img src="../../../src/assets/icons/fluent-mdl2_more-vertical.png" alt="" />
			</div>
		</div>
		
	</div>
  )
}

export default Post