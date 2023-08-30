import React, { useState } from 'react';

import Navbar from '../components/Navbar/Navbar';
import LateralMenu from '../components/LateralMenu/LateralMenu'
import FriendsMenu from '../components/FriendsMenu/FriendsMenu';

import Post from '../components/Post/Post';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario'


import { ComponentProvider, useComponentContext } from '../context/ComponentContext';


const components = { // name for the button click // <component name>
	userProfile: PerfilUsuario,
	post: Post,
}

const Home = () => {
	
	const { selectedComponent } = useComponentContext()
	const ComponentToRender = components[selectedComponent];


	return(
		
		<div className='homeContainer'>
			<Navbar />
			
			<div className="homeContent">
				<LateralMenu />
				
				
					{ComponentToRender ? <ComponentToRender /> : <p>nada aqui por enquanto</p>}
				
				

				<FriendsMenu />
			</div>
			
		</div>
	);
};

export default Home;