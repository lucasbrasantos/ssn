import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { useComponentContext } from '../../context/ComponentContext';


import './style.scss'

const Navbar = () => {
  
	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


	return (

	<nav className='navbar' id='navbar'>
		<span className='logo'>Logo</span>

		<div className="col1">
			<span onClick={() => handleButtonClick('post')} ><img src="../../../src/assets/icons/fluent-mdl2_home.png" alt="" /></span>
			<span onClick={() => handleButtonClick('createPost')} ><img src="../../../src/assets/icons/Vector.png" alt="" /></span>
		</div>

		<span className='searchSpan'>
			<input name='search' className='search' type="text" placeholder='Pesquisar...' />
		</span>

		<div className="col2">
			<span onClick={() => handleButtonClick('ranking')} ><img src="../../../src/assets/icons/fluent-mdl2_trophy.png" alt="" /></span>
			<span onClick={() => handleButtonClick('forum')} ><img src="../../../src/assets/icons/fluent-mdl2_office-chat.png" alt="" /></span>
			<span onClick={() => handleButtonClick('chatAll')} ><img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" /></span>
		</div>

		<img className="navbarAvatar" src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
	</nav>
	)
}

export default Navbar


