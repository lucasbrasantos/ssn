import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Box, CircularProgress } from '@mui/material'

const Search = () => {

	const {currentUser} = useContext(AuthContext);
	
	const a = undefined;
	const [selectedInterest, setSelectedInterests] = useState('all');
	const [filteredPosts, setFilteredPosts] = useState([]);

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
		
		setSelectedInterests(selectedValue)
		console.log(selectedValue);

		if(selectedInterest === 'all'){
			setFilteredPosts(data)
		}else{
			setFilteredPosts({users: data.user, posts: data.posts.filter(post => post.interest.interestsid === parseInt(selectedInterest))})
		}
		

		// console.log(filteredPosts);
		// console.log(data);
		// console.log('id: ' + selectedInterest);
	}

	return (
		<div className='searchBox'>
			<div className='filtro' style={{width:'100%'}}>
				<select value={selectedInterest} onChange={(e) => {handleChange(e.target.value)}}>
					
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
					
					selectedInterest === 'all' && data ? data.posts.map((e, key) => (

						<PostPerfil

							data={e}
							key={key}
						/>

					)) : filteredPosts && data ? filteredPosts.posts.map((e, key) => (

						<PostPerfil

							data={e}
							key={key}
						/>

					)) : (

						<Box sx={{ position:'absolute', transform:'translateX(-13px)', display: 'flex', width:'100%', alignItems:'center', justifyContent:'center' }}>
							<CircularProgress />
				  		</Box>

					)

				}

				</div>
			</div>

	 	</div>
	)
}

export default Search