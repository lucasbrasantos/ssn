import React, { useState } from 'react';

import Navbar from '../components/Navbar/Navbar';
import LateralMenu from '../components/LateralMenu/LateralMenu'
import FriendsMenu from '../components/FriendsMenu/FriendsMenu';

import Post from '../components/Post/Post';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario';
import Search from '../components/search/Search';


import { ComponentProvider, useComponentContext } from '../context/ComponentContext';
import Forum from '../components/Forum/Forum';


const components = { // name for the button click // <component name>
	userProfile: PerfilUsuario,
	post: Search,
	forum: Forum,
}

const Home = () => {
	
	const { selectedComponent } = useComponentContext()
	const ComponentToRender = components[selectedComponent];


	return(
		
		<div className='homeContainer'>
			<Navbar />
			
			<div className="homeContent">
				<LateralMenu />
				
				
					{
						ComponentToRender ? <ComponentToRender /> : <p className='nothing'>nada aqui por enquanto</p> // aqui esta o component renderizado no centro / na parte principal
						// e a condição ? = if
						// se existe o ComponentToRender, renderiza ele, se nao renderiza o <p>
					}
				
				

				<FriendsMenu />
			</div>
			
		</div>
	);
};

export default Home;