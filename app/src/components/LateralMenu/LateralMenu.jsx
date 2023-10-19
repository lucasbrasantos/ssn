import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext.jsx'
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { getUser } from '../../context/UserHook';



const LateralMenu = () => {

	const navigate = useNavigate();
	
	const {setSelectedComponent} = useComponentContext();
	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const {currentUser} = useContext(AuthContext); // curent user logged in

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
	<div className='boxMenu'>
		<div className='opcs opcs-user' onClick={() => handleButtonClick('userProfile')} >
			<img src={currentUser.photoURL || "../../../src/assets/Icon.png"} alt="" />
			{user ? user.name : currentUser.displayName}
		</div>

		<div className='opcs' onClick={() => handleButtonClick('addFriend')} >
			<img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
			add amigo
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_settings.png" alt="" />
			acessibilidade
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_clear-night.png" alt="" />
			tema
		</div>

		<div className='opcs' onClick={ () => {
		  signOut(auth)
		} }>
			<img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" />
			sair
		</div>
	</div>
  )
}

export default LateralMenu