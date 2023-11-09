import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const FriendsMenu = () => {


	const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState();	

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
			setCurrentUserAPI(res.data[0])
			
		})
		.catch((err) => { console.error(err); });


		await axios.get(`http://localhost:3000/friendsUsrId/${currentUserAPI && currentUserAPI.userid}` )
		.then((res) => { setFriends(res.data[0]) })
		.catch((err) => { console.error(err); });
				
	}

	const [friends, setFriends] = useState()
	console.log(friends);
	console.log(currentUserAPI);
  
	return (
		<div className='boxF'>
			<h1>Amigos</h1>
			<div className='friends'>nome amigo</div>
		</div>
	)
}

export default FriendsMenu