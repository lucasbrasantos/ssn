import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { useComponentContext } from '../../context/ComponentContext';


import './style.scss'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  
	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


	/////////////////////////////
	
	const {currentUser} = useContext(AuthContext); // curent user logged in
	const [currentUserAPI, setCurrentUserAPI] = useState()

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
		  .catch((err) => {
				console.error(err);
		  });
	}

	
	/////////////////////////////

	return (

	<nav className='navbar' id='navbar'>
		<span className='logo'><img className='logoImg' src="../../../src/assets/DESIGN/logos/g9347.png" alt="" /></span>

		<div className="col1">
			<span onClick={() => handleButtonClick('posts')} ><img src="../../../src/assets/icons/fluent-mdl2_home.png" alt="" /></span>
			<span onClick={() => handleButtonClick('createPost')} ><img src="../../../src/assets/icons/Vector.png" alt="" /></span>
		</div>

		<span className='searchSpan'  onClick={() => handleButtonClick('search')}>
			<input name='search' className='search' type="text" placeholder='Pesquisar...' />
		</span>

		<div className="col2">
			<span onClick={() => handleButtonClick('ranking')} ><img src="../../../src/assets/icons/fluent-mdl2_trophy.png" alt="" /></span>
			<span onClick={() => handleButtonClick('forum')} ><img src="../../../src/assets/icons/fluent-mdl2_office-chat.png" alt="" /></span>
			<span onClick={() => handleButtonClick('chatAll')} ><img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" /></span>
		</div>

		<img className="navbarAvatar" src={currentUserAPI ? currentUserAPI.photourl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="" />
	</nav>
	)
}

export default Navbar


