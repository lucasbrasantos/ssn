import React, { useEffect, useState } from 'react'
import './style.scss'
import Post from '../Post/Post.jsx'
import axios from 'axios'

const Posts = () => {

	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [interests, setInterests] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async() => {
		await axios.get('http://localhost:3000/posts')
		.then(res => setPosts(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))

		
		await axios.get('http://localhost:3000/users')
		.then(res => setUsers(res.data))
		.catch(err => console.log(err))
		
		
	}

	
	

	const sortedPosts = posts.sort((a, b) => new Date(b.timeposted) - new Date(a.timeposted)); // sort posts by timestamp newest to oldest
	const postWithUsers = sortedPosts.map((post) => { // e => element = each post in sorted posts
		const user = users.find(user => user.userid === post.userid)

		return{
			...post, user
		}
	})

	
	// console.log(postWithUsers);
	console.log(sortedPosts);
	// console.log(users);
	// console.log(interests);

	return (
		<div id='PostsContainer'>
			
			{
				
				postWithUsers.length > 0 ? postWithUsers.map((e) => {
					
					
					
					return(
						<Post
							id={e.id}
							username={e.user && e.user.username}
							photo_url={e.photourl}
							user_photo_url={e.user && e.user.photourl}							
							likes={e.likes}
							title={e.title}
						/>
					)
				}) : (
				<p style={{color:'white'}} >loading...</p>
				)

			}
			
		</div>
	)
}

export default Posts