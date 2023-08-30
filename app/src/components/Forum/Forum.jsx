import React from 'react'

import ForumBlock from '../ForumBlock/ForumBlock.jsx'

import './style.scss'

const Forum = () => {
	return (
		<div id='ForumPage'>
			<h1 className='pageTitle'>forum</h1>
			
			<span className='searchSpan'>
				<input name='search' className='search' type="text" placeholder='Pesquisar...' />
			</span>

			<ForumBlock/>
			<ForumBlock/>
			<ForumBlock/>
		</div>
	)
}

export default Forum