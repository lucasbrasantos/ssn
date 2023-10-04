import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../../context/AuthContext'


function CreatePost() {

	const [interests, setInterests] = useState([])
	const [img, setImg] = useState(null)
	
	const {currentUser} = useContext(AuthContext);
	const [user, setUser] = useState()	


	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async() => {

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))		

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


	const getInterestsId = (tag) => {
		const interest = interests.find(e => e.description == tag)
		return interest
	}

	const dateNow = () => {
		let date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

		let parts = date.split(', ');                
		let dateParts = parts[0].split('/');
		let timeParts = parts[1].split(':');

		return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0] + ' ' + timeParts[0] + ':' + timeParts[1] + ':' + timeParts[2];
	} 

	const handleSubmit = async(e) => {
		e.preventDefault()
		console.log(e);

        const title = e.target[1].value;
        const tag = e.target[2].value;

		const storageRef = ref(storage, `${user.userid}_${user.firebase}/${title}_${img.name}`)
		
		console.log(img);
		console.log(storageRef);
		
		const uploadTask = uploadBytesResumable(storageRef, img);

		uploadTask.on(
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
					console.log('File is available at: ', downloadURL);


					await axios.post('http://localhost:3000/posts', {
						title: title,
						photourl: downloadURL,
						timeposted: dateNow(),
						likes: 0,
						userid: user.userid,
						tag: getInterestsId(tag).interestsid,
						moderator_status: 0,						
					})
					.then((res) => {
						console.log(res);
		
					})
					.catch((error) => {
						console.log(error);
						
					}); 


				})
			}
		)

		setImg(null)	
		
	}

		
	return (
		<div className='CPcontainer'>
			<h1>Postar</h1>
			<form action='' onSubmit={handleSubmit}>
			<div className="addArquivo">
					<label htmlFor="file">Adicionar Foto</label>
					<input type="file" id="file" onChange={(e) => {setImg(e.target.files[0])} }/>
			</div>

			<div className="inputs">
					<label htmlFor="user">Titulo:</label>
					<input name='user' id='tirulo' type="text" placeholder="Adicione um Titulo..."/>

					{
						/*
						<label htmlFor="password">Descrição</label>
						<input name='email' id='descricao' type="text" placeholder="Adicione uma Descrição..."/>					
						*/
					}

					<label id='tagsLabel' htmlFor="tags">tags:</label>
					<select name="tags" id="tags">
						{
							interests.map((e, i) => {
								
								return(
									<option key={i} value={e.description && e.description}>{e.description || 'value'}</option>
								)
							})
						}
					</select>

					<button type='submit' >Postar</button>
			</div>
			</form>
		</div>
	)
}

export default CreatePost