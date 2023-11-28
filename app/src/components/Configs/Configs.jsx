import React, { useContext, useEffect, useState } from 'react';
import './style.scss'; 

import {AuthContext} from '../../context/AuthContext.jsx'
import DeleteUserData from './functions/deleteUserData.js';
import axios from 'axios';
import Swal from 'sweetalert2';

const Configs = () => {

	const {currentUser} = useContext(AuthContext)
	const [currentUserAPI, setCurrentUserAPI] = useState({})

	const handleDeleteBtnClick = () => {

		DeleteUserData({
			// userId: currentUserAPI?.userid,
			userId: 3,
			// userUid: currentUser.uid,
		})

	}
	
	const handleCreateTag = async() => {

		const { value } = await Swal.fire({
			title: "Criar Tag",
			text: "Escreva sua nova tag abaixo",
			icon: "warning",
			input: "text",
			inputAttributes: {
				autocapitalize: "off"
			},
			inputValidator: (value) => {
				if (!value) {
				  return "Você precisa escrevar algo antes!";
				}
			},
			showCancelButton: true,
		})

		if (value) {
			const tag = `#${value}`
			console.log(tag);

			await axios.post('http://localhost:3000/interests', {
				description: tag,					
			}).then(res => {
				console.log(res);

				Swal.fire({
					title: "Success",
					text: `tag ${tag} inserida com sucesso`,
					icon: "success"
				});

			}).catch(err => {
				console.log(err);
			})

		}		



	}


	

	useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async () => {
		await axios.get('http://localhost:3000/user_uid', {
			params: {
			uid: currentUser.uid,
		}})
		.then((res) => {
			setCurrentUserAPI(res.data[0]);
		})
		.catch((err) => {
			console.error(err);
		});
	}


	return(
		<div className='ConfigDiv'>

			{/* 			
			
			<div className="ConfigsOpc">
				<p>Opção 1</p>
				<input type="checkbox" defaultChecked />
			</div>

			<div className="ConfigsOpc">
				<p>Opção 2</p>
				<input type="checkbox" />
			</div>

			<div className="ConfigsOpc">
				<p>Opção 3</p>
				<label className ="switch">
					<input type="checkbox" />
					<span className ="slider round"></span>
				</label>
			</div>

			<div className="ConfigsOpc">
				<p>Opção 4</p>
				<label className ="switch">
					<input type="checkbox" defaultChecked/>
					<span className ="slider round"></span>
				</label>
			</div>
			
			*/}


			<div className="ConfigsOpc" style={{cursor:'pointer'}} onClick={() => { handleCreateTag() }}>
				<p style={{color: 'white'}}>Criar Tag</p>
				<img style={{height:'24px'}} src="../../../src/assets/icons/Vector.png" alt="" />
			</div>
			<div className="ConfigsOpc" style={{cursor:'pointer'}} onClick={() => { handleDeleteBtnClick() }}>
				<p style={{color: 'rgb(204,29,29)'}}>Excluir Conta</p>
				<img style={{height:'24px'}} src="https://cdn.icon-icons.com/icons2/1982/PNG/512/trashbin_123015.png" alt="" />
			</div>

		</div>
	)
}

export default Configs