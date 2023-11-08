import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ForumBlock from '../ForumBlock/ForumBlock.jsx'
import {useNavigate} from 'react-router-dom'
import { useComponentContext } from '../../context/ComponentContext';

import './style.scss'

const Forum = () => {

	const navigate = useNavigate();
	
	const {setSelectedComponent} = useComponentContext();
	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	
	const [forum, setForum] = useState([])
	const [interests, setInterests] = useState([])
	const [users, setUsers] = useState([])

	const fetchData = async() => {
		await axios.get('http://localhost:3000/forum')
		.then(res => setForum(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/users')
		.then(res => setUsers(res.data))
		.catch(err => console.log(err))
		
	}

	useEffect(() => {
		fetchData()
	}, []);

	function findTag(tag){

		const matchingInterest = interests.find((e) => e.interestsid === tag);
		return matchingInterest && matchingInterest.description
	}

	function findUsers(userid){

		const matchingUser = users?.find((e) => e.userid === userid);
		return matchingUser && matchingUser
	}

	

	return (
		<div id='ForumPage'>
			<h1 className='pageTitle'>forum</h1>
			
			<span className='searchSpan' onClick={() => handleButtonClick('createForum')}>
				<input name='search' className='search' type="text" placeholder='Pesquisar...'/>
			</span>


			{
				(forum && users.length > 0 && forum.length > 0) ?

					forum.map((e, key) => {

						return <ForumBlock
						key={key}
						data={e}
						title={e.title}
						user={findUsers(e.userid)}
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