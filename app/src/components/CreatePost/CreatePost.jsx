import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../../context/AuthContext'
import { useComponentContext } from '../../context/ComponentContext'

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';


function CreatePost() {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	// ------------------ //
	
	const [uploadProgress, setUploadProgress] = useState(0)
	
	
	// ------------------ //

	
	const [img, setImg] = useState(null)
	const [imgPreview, setImgPreview] = useState(null)
	
	const [interests, setInterests] = useState([])
	
	const {currentUser} = useContext(AuthContext);
	const [user, setUser] = useState()	
	
	const [points, setPoints] = useState(user ? user.points : 0)	


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
		
		// console.log(img);
		// console.log(storageRef);
		
		const uploadTask = uploadBytesResumable(storageRef, img);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Listener for monitoring the upload progress.
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);
				setUploadProgress(progress)

				if (progress === 100) {
					// Upload is 100% complete
					setPoints(points + 5)
					
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
	
						setImg(null)
						handleButtonClick('posts')
	
	
					})
				}
			},
			(error) => {
				console.log(error);
			}
		)
		
	}

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const image = e.target.files[0];
			setImg(image);
			setImgPreview(URL.createObjectURL(image))
			// console.log(image);
		}
	};

		
	return (
		<div className='CPcontainer'>
			<h1>Postar</h1>
			<form action='' onSubmit={handleSubmit}>
			<div className="addArquivo">
					<label htmlFor="file">Adicionar Foto</label>
					<input type="file"accept='image/*' id="file" onChange={(e) => handleImageChange(e) }/>
					{
						img && (
							<img src={imgPreview} alt="Selected" className='imgPreview' />
						)
					}
			</div>
			
			<Box sx={{ width: '100%', margin:'16px 0 50px 0' }}>
				<LinearProgress variant="determinate" value={uploadProgress} />
			</Box>

			<div className="inputs">
					<label htmlFor="user">Titulo:</label>
					<input name='user' id='tirulo' type="text" placeholder="Adicione um Titulo..." maxLength="64" />

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