import React, { useState } from 'react';

import Navbar from '../components/Navbar/Navbar';
import LateralMenu from '../components/LateralMenu/LateralMenu'
import FriendsMenu from '../components/FriendsMenu/FriendsMenu';

import CreatePost from '../components/CreatePost/CreatePost';
import PerfilUsuario from '../components/PerfilUsuario/PerfilUsuario';
import addFriend from '../components/addFriend/addFriend';
import Configs from '../components/Configs/Configs';
import Search from '../components/search/Search';


import { ComponentProvider, useComponentContext } from '../context/ComponentContext';
import Forum from '../components/Forum/Forum';
import ForumChat from '../components/ForumChat/ForumChat';
import ChatAll from '../components/Chat/ChatAll';
import ChatRecent from '../components/Chat/ChatRecent';
import ChatUser from '../components/ChatUser/ChatUser';
import Ranking from '../components/Ranking/Ranking';
import Posts from '../components/Posts/Posts';
import EdtPerfilU from '../components/EdtPerfilU/EdtPerfilU';


const components = { // name for the button click // <component name>
	userProfile: PerfilUsuario,
	addFriend: addFriend,
	configs: Configs, 
	posts: Posts,
	createPost: CreatePost,
	search: Search,
	forum: Forum,
	forumChat: ForumChat,
	chatAll: ChatAll,
	chatRecent: ChatRecent,
	chatUser: ChatUser,
	ranking: Ranking,
	edtPerfilU: EdtPerfilU,
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