import React, { useContext, useEffect, useState } from 'react';
import './style.scss'

import { AuthContext } from '../../context/AuthContext.jsx'
import { SelectedUserContext } from '../../context/SelectedUserContext.jsx';
import axios from 'axios';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';



const CreateForum = () => {

	const {currentUser} = useContext(AuthContext)
	const [currentUserAPI, setCurrentUserAPI] = useState()

	const [interests, setInterests] = useState([])
	const [forumDetails, setForumDetails] = useState({
		title: '',
		description: '',
		interest: undefined,
	});

	console.log(currentUserAPI);
	useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async() => {

		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  	})
		.then((res) => { setCurrentUserAPI(res.data[0]) })
		.catch((err) => { console.error(err); });

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))

	}

	///////////

	const dateNow = () => {
		let date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

		let parts = date.split(', ');                
		let dateParts = parts[0].split('/');
		let timeParts = parts[1].split(':');

		return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0] + ' ' + timeParts[0] + ':' + timeParts[1] + ':' + timeParts[2];
	} 

	
	const createForum = async (e) => {
		e.preventDefault();
		// Send a POST request with forumDetails object to create the forum

		console.log(forumDetails);
		
		try {
			const res = await axios.post('http://localhost:3000/forum', {
				
				title: forumDetails.title,
				description: forumDetails.description,
				tag: forumDetails.interest === undefined ? 1 : forumDetails.interest,
				likes: 0,           
				userid: currentUserAPI.userid,
				created_at: dateNow(),
				moderator_status: 0
			});


			const forumId = res.data.slice(-2)

			const userForumId = `${currentUser.uid}_${forumId}`; // firebase uid + forum id
			
			await setDoc(doc(db, "foruns", userForumId), {}); 				

			await updateDoc(doc(db, "foruns", userForumId), {

				[userForumId+".forumInfo"]: {
					forumId: forumId,
					userid: currentUserAPI.userid,
					username: currentUserAPI.username,
					photoURL: currentUserAPI.photourl,
					tag: forumDetails.interest === undefined ? 1 : forumDetails.interest,
					title: forumDetails.title,
					description: forumDetails.description,
					likes: 0
				},
				[userForumId+".date"]: serverTimestamp()
			});
			
			
			
			// Handle successful creation
			console.log('Forum created:', res.data);
		} catch (error) {
			// Handle error on forum creation
			console.error('Error creating forum:', error);
		}
		
	};


	return (
		<div className="CreatFDiv">
			<form className='FormCFD' action="" onSubmit={(e) => createForum(e)}>
				{/* <input style={{display:"none"}} type="file" id="file"/> */}
					<h1>criar forum</h1>
				{/*
				<label className='LImg' htmlFor="file">
					<img className='AddFImg' src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
					<span>Add Imagem</span>
				</label>
				*/}

				<select name="tags" id="tags" placeholder='Tag' onChange={(e) => {setForumDetails({...forumDetails, interest: e.target.value})}}>
					
					{
						
						interests && interests.map((e, i) => (

							<option key={i} value={e.interestsid}>{e.description}</option>
						))
					}

				</select>
				<input className='inputCF' type="text" placeholder='Titulo do Forum' value={forumDetails.title} onChange={(e) => setForumDetails({ ...forumDetails, title: e.target.value })}/>
				<textarea className='inputCF' placeholder='Forum Descrição' cols="30" rows="10" onChange={(e) => setForumDetails({ ...forumDetails, description: e.target.value })}></textarea>

				<button className='BtnCF' type='submit'>
					Criar
				</button>
			</form>

			
		</div>
	)
}

export default CreateForum;