import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Post from '../components/Post/Post';
import LateralMenu from '../components/LateralMenu/LateralMenu'
import FriendsMenu from '../components/FriendsMenu/FriendsMenu';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario'


const Home = () => {
	return(
		<div className='homeContainer'>
			<Navbar />
			
			<div className="homeContent">
				<LateralMenu />
				<Post />
				<FriendsMenu />
			</div>
			
		</div>
	);
};

export default Home;