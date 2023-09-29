import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext.jsx'
import axios from 'axios';
import { auth } from '../../firebase';


const LateralMenu = () => {

	const navigate = useNavigate();
	
	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const {currentUser} = useContext(AuthContext); // curent user logged in
	const [resUser, setResUser] = useState()

	useEffect(() => {
		
		axios.get('http://localhost:3000/user_uid', {
		  params: {
			uid: currentUser.uid,
		  },
		})
		.then( async(res) => {
			setResUser(res.data[0])
		})
		.catch((err) => {
		  	console.error(err);
		});
	}, []);
	
	console.log(resUser);
  return (
	<div className='boxMenu'>
		<div className='opcs opcs-user' onClick={() => handleButtonClick('userProfile')} >
			<img src={currentUser.photoURL || "../../../src/assets/Icon.png"} alt="" />
			{resUser ? resUser.name : currentUser.displayName}
		</div>

		<div className='opcs' onClick={() => handleButtonClick('post')} >
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
		  navigate('login')
		} }>
			<img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" />
			sair
		</div>
	</div>
  )
}

export default LateralMenu