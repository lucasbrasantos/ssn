import React from 'react'

import ForumBlock from '../ForumBlock/ForumBlock.jsx'

import './style.scss'

const Forum = () => {


	const data = [
		
		{
			"title": "Opiniões sobre o jogo de ontem?",
			"username": "Mathias Galvão",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "Comentários sobre os jogos recentes.",
			"tag": 'asdasd',
			"likes": 118,
		},
		{
			"title": "Opiniões sobre o jogo de ontem?",
			"username": "Mathias Galvão",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "Comentários sobre os jogos recentes.",
			"tag": 'asdasd',
			"likes": 118,
		},
		{
			"title": "Opiniões sobre o jogo de ontem?",
			"username": "Mathias Galvão",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "Comentários sobre os jogos recentes.",
			"tag": 'asdasd',
			"likes": 118,
		},
		{
			"title": "Opiniões sobre o jogo de ontem?",
			"username": "Mathias Galvão",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "date equator arrive directly take club meal was garden finish clearly our available bank fly mysterious national beauty combine brush species health driver whetherlorem",
			"tag": 'asdasd',
			"likes": 118,
		},

	]
	


	return (
		<div id='ForumPage'>
			<h1 className='pageTitle'>forum</h1>
			
			<span className='searchSpan'>
				<input name='search' className='search' type="text" placeholder='Pesquisar...' />
			</span>


			{
				data.map(e => {
					return <ForumBlock
					title={e.title}
					username={e.username}
					created_at={e.created_at}
					description={e.description}
					tag={e.tag}
					likes={e.likes}
					/>
				})
			}



		</div>
	)
}

export default Forum