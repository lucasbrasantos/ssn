import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { SelectedUserContext } from '../../context/SelectedUserContext';
import { useComponentContext } from '../../context/ComponentContext';

const PerfilUsuario = () => {

	const {currentUser} = useContext(AuthContext);
	
	///////////////////
	
	const [user, setUser] = useState()
	const [posts, setPosts] = useState([])
	const [comments, setComments] = useState([])	

	const {data} = useContext(SelectedUserContext)
	const {dispatch} = useContext(SelectedUserContext)

	// console.log(data.userId);

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

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

		if (!data.userId) {
		
			await axios.get('http://localhost:3000/user_uid', {
				params: {
				uid: currentUser.uid,
			}})
			.then((res) => { setUser(res.data[0]) })
			.catch((err) => { console.error(err); });
			
		}else{

			await axios.get('http://localhost:3000/user_id', {
				params: {
				id: data.userId,
			}})
			.then((res) => { setUser(res.data[0]) })
			.catch((err) => { console.error(err); });
			
			dispatch({ type: 'CLEAR_USER' });
		}
	}
	
	// console.log(user);

	///////////////////

	const sortedPosts = user ? posts.sort((a, b) => new Date(b.timeposted) - new Date(a.timeposted)) : null; // sort posts by timestamp newest to oldest
	const filteredPosts = user ? sortedPosts.filter((p) => p.userid === user.userid) : null;
		
	const post_data = user ? {
		user: user,
		posts: filteredPosts.map((post) => {
			const postComments = comments.filter((c) => c.postid === post.postid)
			return { ...post, comments: postComments}
		}), 
	} : null

	console.log(post_data);
	
	////////////////////////

	const handleChangeEdtPerfil = () => {
	  

		// console.log(user.userid);
		// dispatch({ type: 'SELECT_USER', payload:{userId: user.userid} });
		
		handleButtonClick('edtPerfilU');
	}

	
	
	return (
		<div className='postContainerPerfil'>
			<div className='postTopPerfil'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className='avatarUser' src={user ? user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />

				<div>
					<p>{user && user.name}</p>
					<p style={{fontSize:'.8rem', marginTop:'5px'}}>{user && user.username}</p>
					<p>{user && user.info}</p>
				</div>
				</div>
				<div>
					<p>N Seguidores</p>
					<p>Rank Usuario</p>
				</div>

			</div>
			<div className='PerfilBtns'>
				{user && user.userId !== currentUser.uid ?
					<div className='BtnsU'>
						<button onClick={() => handleChangeEdtPerfil()} >
							Editar perfil
						</button>
						<button>
							Compartilhar Perfil
						</button>
					</div>
					:
					<div className='BtnsU'>
						<button>
							Follow
						</button>
						<button>
							Mensagem
						</button>
					</div>
				}
			</div>
			<div className='posts'>
					<div className='grid'>
					
					{
					
						post_data && post_data.posts.map((e, key) => (

							<PostPerfil
								data={e}
								key={key}
							/>

						))

					}

				</div>

			</div>
		</div>
	)
}

export default PerfilUsuario