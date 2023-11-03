import React, { useContext } from 'react'
import './style.scss'
import { SelectedPostContext } from '../../context/SelectedPostContext'
import { useComponentContext } from '../../context/ComponentContext'

const PostPerfil = (props) => {
	
	const p = props.data
	
	const {setSelectedComponent} = useComponentContext();
	const {dispatch} = useContext(SelectedPostContext)

	const handleChangeComponent = (component) => {
		setSelectedComponent(component)
	}

	const handlePostPerfilClick = () => {		

		handleSelect({
			postId: p.postid,
		})

		handleChangeComponent('posts');
	}

	const handleSelect = (u) => {
		dispatch({type: 'SELECT_POST', payload:u})
	}
	
	return (
		<div className='post' onClick={() => {
			handlePostPerfilClick()
		}}>
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