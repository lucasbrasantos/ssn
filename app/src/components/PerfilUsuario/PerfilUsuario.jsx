import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { SelectedUserContext } from '../../context/SelectedUserContext';
import { useComponentContext } from '../../context/ComponentContext';
import Swal from 'sweetalert2';

const PerfilUsuario = () => {

	const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState({});	
	const [currentUserFriends, setCurrentUserFriends] = useState([])
	
	const [currentUserRanking, setCurrentUserRanking] = useState({});	
	const [friends, setFriends] = useState([])
	
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

		const fetchUserInfo = async(res) => {
			await axios.get('http://localhost:3000/friendsUsrId', {
				params:{
					id: res.data[0].userid,
					queryType: 'isFriend'
				}
			}, )
			.then((res) => {
				setFriends(res.data)
				
			})
			.catch((err) => { console.error(err); });
	
			await axios.get('http://localhost:3000/user_ranking', {
				params: {
					id: res.data[0].userid,
				},
			})
			.then((res) => {
				setCurrentUserRanking(res.data[0])
			})
			.catch((err) => { console.error(err)  });



		}

		if (data.userId) { // se clicar perfil de outro usuario diferente do usuario atual
			
			await axios.get('http://localhost:3000/user_id', {
				params: {
				id: data.userId,
			}})
			.then((res) => {
				setUser(res.data[0])

				fetchUserInfo(res)

			})
			.catch((err) => { console.error(err); });

			dispatch({ type: 'CLEAR_USER' });

		}else{ // pegar info do currentUser
			
			await axios.get('http://localhost:3000/user_uid', {
				params: {
				uid: currentUser.uid,
			}})
			.then((res) => {
				setUser(res.data[0]);

				fetchUserInfo(res)
			})
			.catch((err) => { console.error(err); });
		}
		
		await axios.get('http://localhost:3000/posts')
		.then(res => setPosts(res.data))
		.catch(err => console.log(err))

		await axios.get('http://localhost:3000/comment')
		.then(res => setComments(res.data))
		.catch(err => console.log(err))

		
		const resUserAPI = await axios.get('http://localhost:3000/user_uid', {
			params: {
			uid: currentUser.uid,
		}})
		setCurrentUserAPI(resUserAPI.data[0]);
		
		await axios.get('http://localhost:3000/friendsUsrId', {
			params:{
				id: resUserAPI.data[0].userid,
				queryType: 'isFriend'
			}
		}, )
		.then((res) => {
			setCurrentUserFriends(res.data)			
		})
		.catch((err) => { console.error(err); });
	}
	
	
	// console.log(data);
	// console.log(currentUserRanking);
	// console.log(friends);
	console.log(currentUserFriends);

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

	// console.log(post_data);
	
	////////////////////////

	const handleChangeEdtPerfil = () => {
	  

		// console.log(user.userid);
		// dispatch({ type: 'SELECT_USER', payload:{userId: user.userid} });
		
		handleButtonClick('edtPerfilU');
	}

	/////////

	const findCurrentUserFriends = currentUserAPI && user && currentUserFriends.some(friend => friend.useridfriend == user.userid)


	/////////

	const handleRemoveFriend = async() => {
	
		console.log(user);
		console.log(currentUserAPI);

		await axios.delete('http://localhost:3000/friends', {
			params:{
				"userid": currentUserAPI.userid,
				"useridfriend": user.userid,
			}
        }) 
        .then(res => {
			console.log(res)

			Swal.fire({
				title: "Sucesso!",
				text: "Amigo removido com sucesso.",
				icon: "success",
				timer: 2500,
				timerProgressBar: true,
			}).then(() => window.location.reload())
		})
        .catch(err => {
			console.log(err)
		})       
		
	}
	
	return (
		<div className='postContainerPerfil'>
			<div className='postTopPerfil'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className='avatarUser' src={user ? user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />

				<div>
					<p>{user && user.name}</p>
					<p style={{fontSize:'.8rem', marginTop:'5px'}}>@{user && user.username}</p>
					<p>{user && user.info}</p>
				</div>
				</div>
				<div>
					<p>N º amigos: {friends ? friends.length : 0}</p>
					<p>Rank Usuario: {currentUserRanking ? currentUserRanking.user_ranking : 0}
					{
						currentUserRanking?.user_ranking == 1 ? <span> - 🥇</span> :
						currentUserRanking?.user_ranking == 2 ? <span> - 🥈</span> :
						currentUserRanking?.user_ranking == 3 ? <span> - 🥉</span> :
						currentUserRanking?.user_ranking < 10 && <span> - 🏆</span>
					}
					</p>
				</div>

			</div>
			<div className='PerfilBtns'>
				{user && user.firebase == currentUser.uid ?
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
						{

							!findCurrentUserFriends ? ( // se nao tiver na lista de amigos do currentUser
								<button>
									Adicionar como amigo
								</button>
							) : (
								<button onClick={() => handleRemoveFriend()}>
									Remover amigo
								</button>
							)
						}
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