import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios'

function CreatePost() {

	const [interests, setInterests] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async() => {

		await axios.get('http://localhost:3000/interests')
		.then(res => setInterests(res.data))
		.catch(err => console.log(err))		
		
	}

		
	return (
		<div className='CPcontainer'>
			<h1>Postar</h1>
			<form >
			<div className="addArquivo">
					<label htmlFor="file">Adicionar Foto</label>
					<input type="file" id="file"/>
			</div>

			<div className="inputs">
					<label htmlFor="user">Titulo</label>
					<input name='user' id='tirulo' type="text" placeholder="Adicione um Titulo..."/>

					<label htmlFor="password">Descrição</label>
					<input name='email' id='descricao' type="text" placeholder="Adicione uma Descrição..."/>					

					<select name="tags" id="tags">
						{
							interests.map((e) => {
								
								return(
									<option value={e.description && e.description}>{e.description || 'value'}</option>
								)
							})
						}
					</select>

					<button type='submit' onClick={''}>Postar</button>
			</div>
			</form>
		</div>
	)
}

export default CreatePost