import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import Post from '../Post/Post.jsx'
import axios from 'axios'
import { useContext } from 'react'
import { SelectedPostContext } from '../../context/SelectedPostContext.jsx'

const Posts = () => {

	const {data} = useContext(SelectedPostContext);
	const {dispatch} = useContext(SelectedPostContext);
	
	// console.log(data);
	const postsRefs = useRef({}); // ref for posts
	
	const scrollToSelectedPost = (postId) => {
		if (postId && postsRefs.current[postId]) {
			postsRefs.current[postId].scrollIntoView({ behavior: 'smooth' });
			dispatch({ type: 'CLEAR_POST' });
		}
	};
	
	
	useEffect(() => {
		if (data && data.postId) {
		  setTimeout(() => {
			scrollToSelectedPost(data.postId);
		  }, 500); // Adjust the delay to wait for the initial render
		}
	  }, [data]);


	///////////

	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [comments, setComments] = useState([])
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

		await axios.get('http://localhost:3000/comment')
		.then(res => setComments(res.data))
		.catch(err => console.log(err))
		
		await axios.get('http://localhost:3000/users')
		.then(res => setUsers(res.data))
		.catch(err => console.log(err))
		
		
	}
	

	const sortedPosts = posts.sort((a, b) => new Date(b.timeposted) - new Date(a.timeposted)); // sort posts by timestamp newest to oldest

	const sortedData = sortedPosts.map((post) => { // e => element = each post in sorted posts
		const user = users.find(user => user.userid === post.userid)
		const comment = comments.filter(comment => comment.postid === post.postid)

		let formattedComments = null;
		if (comment.length === 1) {
			formattedComments = {...comment[0], user: users.find((user) => user.userid === comment[0].userid) };
		} else if (comment.length > 1) {
			// Sort comments by date
			const sortedComments = comment.sort((a, b) => new Date(b.date) - new Date(a.date));
			formattedComments = sortedComments.map((comment) => ({ ...comment, user: users.find((user) => user.userid === comment.userid) }));
		}

		return{
			post,
			user: user,
			comment: formattedComments,
		}
	})	
	
	// console.log(sortedPosts);
	// console.log(sortedData);
	// console.log(users);
	// console.log(interests);

	return (
		<div id='PostsContainer'>
			
			{
				
				sortedData.length > 0 ? sortedData.map((data) => {
				
					return(
						<div ref={(el) => (postsRefs.current[data.post.postid] = el)} key={data.post.postid} >
							<Post
								postData={data}
							/>
						</div>
					)
				}) : (
				<p style={{color:'white'}} >loading...</p>
				)

			}
			
		</div>
	)
}

export default Posts