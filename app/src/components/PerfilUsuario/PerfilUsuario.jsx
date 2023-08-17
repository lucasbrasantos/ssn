import React from 'react'
import './style.scss'

const Post = () => {
  return (
    <div className='postContainerPerfil'>

		<div className='postTopPerfil'>
		<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
			<img className='avatarUser' src="../../../src/assets/Icon.png" alt="" />

				<div>
					<p>Nome de Ususario</p>
					<p>Descriçao Usuario</p>
				</div>
				</div>
				<div>
					<p>N Seguidores</p>
					<p>Rank Usuario</p>
				</div>

			</div>
		<div className='posts'></div>
	</div>
  )
}

export default Post