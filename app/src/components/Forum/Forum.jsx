import React, { useContext, useEffect, useState } from 'react'
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
	const [filteredForum, setFilteredForum] = useState([]);
	const [interests, setInterests] = useState([])
	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState('');


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

	useEffect(() => {
		setFilteredForum(
		  users && forum?.filter(
			(forumItem) =>
			  forumItem?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			  forumItem?.description.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		);
	}, [searchTerm, forum]);



	function findTag(tag){

		const matchingInterest = interests.find((e) => e.interestsid === tag);
		return matchingInterest && matchingInterest.description
	}

	function findUsers(userid){

		const matchingUser = users?.find((e) => e.userid === userid);
		return matchingUser && matchingUser
	}

	

    const handleUserClick = () => {

		handleButtonClick('createForum')
    }

	return (
		<div id='ForumPage'>
			<h1 className='pageTitle'>forum</h1>
			
			<span className='searchSpan'>
				<input
					name='search'
					className='search'
					type='text'
					placeholder='Pesquisar...'
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img onClick={handleUserClick} src="../../../src/assets/icons/Vector.png" alt='' />
			</span>


			{
				(filteredForum && filteredForum.length > 0) ? 

					(users.length > 0 && forum.length > 0) && filteredForum.map((e, key) => {

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
						<p className='noData'>Nenhum fórum encontrado.</p>
					)
			}



		</div>
	)
}

export default Forum