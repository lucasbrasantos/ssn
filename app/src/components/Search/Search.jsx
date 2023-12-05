import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Box, CircularProgress } from '@mui/material'

const Search = ({searchTerm}) => {

	const {currentUser} = useContext(AuthContext);
	
	const a = undefined;
	const [filteredPosts, setFilteredPosts] = useState();
	const [selectedInterest, setSelectedInterest] = useState('all');
	


	///////////////////
	
	const [user, setUser] = useState()
	const [posts, setPosts] = useState([])
	const [comments, setComments] = useState([])	
	const [interests, setInterests] = useState([])


	useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async() => {
		await axios.get('http://localhost:3000/posts')
		.then(res => setPosts(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/comment')
		.then(res => setComments(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  	})
		.then((res) => { setUser(res.data[0]) })
		.catch((err) => { console.error(err); });		
	}

	///////////////////

	const sortedPosts = user ? posts.sort((a, b) => new Date(b.timeposted) - new Date(a.timeposted)) : null; // sort posts by timestamp newest to oldest

	const data = user ? {
		user: user,
		posts: posts.map((post) => {
			const postComments = comments.filter((c) => c.postid === post.postid)
			const postInterests = interests.find((i) => i.interestsid === post.tag)
			return { ...post, comments: postComments, interest: postInterests}
		}), 
	} : null

	// console.log(data)
	

	const handleChange = (selectedValue) => {
		//console.log(selectedValue);
		setSelectedInterest(selectedValue)
		

		if(selectedValue === 'all'){
			setFilteredPosts(data)
		}else{
			setFilteredPosts({users: data.user, posts: data.posts.filter(post => post.interest.interestsid === parseInt(selectedValue))})
		}
		
		console.log(interests.find(e => e.interestsid === parseInt(selectedValue)));

		// console.log(data);
		// console.log('id: ' + selectedInterest);
	}

	const filteredSeachPosts = (selectedInterest === 'all' && data ? data.posts : filteredPosts && data ? filteredPosts?.posts : []).filter(
		(post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	console.log(searchTerm);

	return (
		<div className='searchBox'>
			<div className='filtro' style={{width:'100%'}}>
				<select onChange={(e) => {handleChange(e.target.value)}}>
					
					<option value='all'>tudo</option>
					{
						
						interests && interests.map((e, i) => (

							<option key={i} value={e.interestsid}>{e.description}</option>
						))
					}

				</select>
			</div>
			
			<div className='searchPosts' style={{position:'relative'}}>
				<div className='searchGrid'>
					
				{
				/*
					
					selectedInterest === 'all' && data ? data.posts.map((e, key) => (

						<PostPerfil

							data={e}
							key={key}
						/>

					)) : filteredPosts && data ? filteredPosts.posts.map((e, key) => {	

						return(

							<PostPerfil

								data={e}
								key={key}
							/>

						)
					}) : (

						<Box sx={{ position:'absolute', transform:'translateX(-13px)', display: 'flex', width:'100%', alignItems:'center', justifyContent:'center' }}>
							<CircularProgress />
				  		</Box>

					)*/
					

				}
				{
					filteredSeachPosts.length === 0 ? (
						<p style={{position:'absolute',width:'100%',color:'white'}}>Nenhum post encontrado.</p>
					) : filteredSeachPosts.map((e, key) => (
						<PostPerfil data={e} key={key} />
					))
				}

				</div>
				
			</div>

	 	</div>
	)
}

export default Search