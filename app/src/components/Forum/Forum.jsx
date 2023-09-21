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
			"tag": 'Futebol',
			"likes": 118,
		},
		{
			"title": "Como arrumo a corrente da minha bicicleta?",
			"username": "Lucas Baga",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "Alguem me ajudaaaaaaaaaaaa",
			"tag": 'bike',
			"likes": 97,
		},
		{
			"title": "Volei é jogo de pessoas afeminadas?",
			"username": "Nadiel Voleiss",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "Me sinto meio estranho apos jogar volei, devo me preocupar ????",
			"tag": 'Volei',
			"likes": 2,
		},
		{
			"title": "Neymar ta certo ou ta errado?",
			"username": "Ribeirinho",
			"created_at": "2032-09-03T04:42:20.000Z",
			"description": "date equator arrive directly take club meal was garden finish clearly our available bank fly mysterious national beauty combine brush species health driver whetherlorem",
			"tag": 'Futebol',
			"likes": 1638,
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