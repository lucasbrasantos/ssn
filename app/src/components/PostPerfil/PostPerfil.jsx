import React from 'react'
import './style.scss'

const PostPerfil = (props) => {
	
	const p = props.data
	
	return (
		<div className='post'>
			<img className='postPhotoURL' src={p ? p.photourl : "../../../src/assets/sampleImg.png"} alt="" />
			<div className='status' >
				<div className='icons'>
					<p><img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{p ? p.likes : 0}</p>
					<p><img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" />{p ? p.comments.length : 0}</p>
				</div>
			</div>
		</div>
	)
}

export default PostPerfil

//<p><img src="../../../src/assets/icons/fluent-mdl2_emoji-2.svg" alt="" />{p ? p.comments.length : 0}</p>