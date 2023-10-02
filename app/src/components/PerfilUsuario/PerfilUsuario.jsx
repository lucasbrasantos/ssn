import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'

import { AuthContext } from '../../context/AuthContext';
import { getUser } from '../../context/UserHook';
import axios from 'axios';

const Post = () => {

	const {currentUser} = useContext(AuthContext);
	
	///////////////////
	
	const [user, setUser] = useState()

	useEffect(() => {
		fetchData();		
	}, []);

	const fetchData = async() => {
		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  })
		  .then((res) => {
			  setUser(res.data[0])
		  })
		  .catch((err) => {
				console.error(err);
		  });
	}
	
	// console.log(user);

	///////////////////
	

	return (
		<div className='postContainerPerfil'>

			<div className='postTopPerfil'>
			<div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
				<img className='avatarUser' src={user ? user.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />

					<div>
						<p>{user && user.name}</p>	
						<p>{user && user.info}</p>			
					</div>
					</div>
					<div>
						<p>N Seguidores</p>
						<p>Rank Usuario</p>
					</div>

				</div>
			<div className='posts'>
					<div className='grid'>
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
					<PostPerfil />
				</div>

			</div>
		</div>
	)
}

export default Post