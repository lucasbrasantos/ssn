import React from 'react'
import './style.scss'

const Post = () => {
  return (
    <div className='postContainer'>

		<div className='postTop'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className="postAvatar" src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
				<p>Nome de Ususario</p>
			</div>
			<button className='followBtn'>Seguir</button>
		</div>
		
		<div className='postImg'></div>
		<div className='postBottom'></div>
	</div>
  )
}

export default Post