import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { AuthContext } from '../../context/AuthContext.jsx'
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';



const LateralMenu = () => {

	const navigate = useNavigate();
	
	const {setSelectedComponent} = useComponentContext();
	const {selectedComponent} = useComponentContext();
	
	const handleButtonClick = (component) => {
		
		if (selectedComponent == 'userProfile') {
			setSelectedComponent('nothing')
			
			setTimeout(() => {
				setSelectedComponent(component)
			}, 100)
		}else{
	
			setSelectedComponent(component)
		}		
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
			<img src={user?.photourl || "../../../src/assets/Icon.png"} alt="" />
			<p>{user ? user.username : currentUser.displayName}</p>
		</div>

		<div className='opcs' onClick={() => handleButtonClick('addFriend')} >
			<img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
			<p>add amigo</p>
		</div>

		<div className='opcs' onClick={() => handleButtonClick('configs')} >
			<img src="../../../src/assets/icons/fluent-mdl2_settings.png" alt="" />
			<p>configurações</p>
		</div>

		{/* <div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_clear-night.png" alt="" />
			<p>tema</p>
		</div> */}

		<div className='opcs' onClick={ () => {
		  signOut(auth)
		} }>
			<img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" />
			<p>sair</p>
		</div>
	</div>
  )
}

export default LateralMenu