import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ForumBlock from '../ForumBlock/ForumBlock.jsx'

import './style.scss'

const Forum = () => {

	
	const [data, setData] = useState([])
	const [interests, setInterests] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3000/forum')
		.then(res => setData(res.data))
		.catch(err => console.log(err))

		axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))

		axios.get('http://localhost:3000/users')
		.then(res => setUsers(res.data))
		.catch(err => console.log(err))
		
	}, [])

	function findTag(tag){

		const matchingInterest = interests.find((e) => e.interestsid === tag);
		return matchingInterest && matchingInterest.description
	}

	function findUsers(userid){

		const matchingUser = users.find((e) => e.userid === userid);
		return matchingUser && `${matchingUser.name} | ${matchingUser.username}`
	}

	

	return (
		<div id='ForumPage'>
			<h1 className='pageTitle'>forum</h1>
			
			<span className='searchSpan'>
				<input name='search' className='search' type="text" placeholder='Pesquisar...' />
			</span>


			{
				(data && data.length > 0) ?

				data.map(e => {
					return <ForumBlock
					title={e.title}
					username={findUsers(e.userid)}
					created_at={e.created_at}
					description={e.description}
					tag={findTag(e.tag)}
					likes={e.likes}
					/>
				}) : (
					<p className='noData'>nada aqui</p>
				)
			}



		</div>
	)
}

export default Forum