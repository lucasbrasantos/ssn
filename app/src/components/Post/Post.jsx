import React from 'react'
import './style.scss'

const Post = (props) => {
  return (
    <div className='postContainer'>

		<div className='postTop'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className="postAvatar" src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
				<p>{props.username || 'username'}</p>
			</div>
			<button className='followBtn'>Seguir</button>
		</div>
		
		<div className='postImg'>
			<img src={props.photo_url  || "../../../src/assets/sampleImg.png"} alt="" />
		</div>
		<div className='postBottom'>{props.title}</div>
		
	</div>
  )
}

export default Post