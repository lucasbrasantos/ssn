import React from 'react'
import './style.scss'

const Post = (props) => {
  return (
	<div>
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
	
	<div className="comments">
		<div className="commentBox">
			<div>
				<img src="../../../src/assets/Icon.png" alt="" />
			</div>
			<div style={{marginRight:'47px'}}>
				<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
					<p>user name</p>
					<p>56min</p>
				</div>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

				<div className='cmtBtn'>
					<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
						<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
						{props.likes > 0 &&
							<p className='statusbtn'>{props.likes}</p>
						}
					</div>
					<button>Responder</button>
				</div>
			</div>
		</div>

		<div className="commentBox">
			<div>
				<img src="../../../src/assets/Icon.png" alt="" />
			</div>
			<div style={{marginRight:'47px'}}>
				<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
					<p>user name</p>
					<p>56min</p>
				</div>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

				<div className='cmtBtn'>
					<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
						<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
						{props.likes > 0 &&
							<p className='statusbtn'>{props.likes}</p>
						}
					</div>
					<button>Responder</button>
				</div>
			</div>
		</div>
		<div className="commentBox">
			<div>
				<img src="../../../src/assets/Icon.png" alt="" />
			</div>
			<div style={{marginRight:'47px'}}>
				<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
					<p>user name</p>
					<p>56min</p>
				</div>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

				<div className='cmtBtn'>
					<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
						<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
						{props.likes > 0 &&
							<p className='statusbtn'>{props.likes}</p>
						}
					</div>
					<button>Responder</button>
				</div>
			</div>
		</div>
		<div className="commentBox">
			<div>
				<img src="../../../src/assets/Icon.png" alt="" />
			</div>
			<div style={{marginRight:'47px'}}>
				<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
					<p>user name</p>
					<p>56min</p>
				</div>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

				<div className='cmtBtn'>
					<div style={{ display:'flex', flexDirection:'row', gap:'5px'}}>
						<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
						{props.likes > 0 &&
							<p className='statusbtn'>{props.likes}</p>
						}
					</div>
					<button>Responder</button>
				</div>
			</div>
		</div>

	</div>

	</div>
  )
}

export default Post