import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Post from '../components/Post/Post';


import '../styles/main.scss'


const Home = () => {
	return(
		<div className='HomeContainer'>
			
			<Navbar />
			<Post />
			
		</div>
	);
};

export default Home;