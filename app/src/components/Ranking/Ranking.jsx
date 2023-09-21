import React from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';
import RankUser from '../RankUser/RankUser';

const Ranking = () => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const data = [
		{
			"userid": 1,
			"name": "Stephen Curry",
			"points": 4245,
		},
		{
			"userid": 2,
			"name": "Calvo Klein",
			"points": 3890,
		},
		{
			"userid": 3,
			"name": "Estêvão Curi",
			"points": 2350,
		},
		{
			"userid": 4,
			"name": "Tomas Moreno",
			"points": 2278,
		},
		{
			"userid": 5,
			"name": "Herrero Victor",
			"points": 900,
		},
		{
			"userid": 6,
			"name": "Andre Pierce",
			"points": 60,
		},
	]

	return (
		<div id='Ranking'>
			<h1>Ranking</h1>
			
			
			{
				data.map(e => {
					return <RankUser
					name={e.name}
					points={e.points}
					ranking={e.userid}
					/>
				})
			}

		</div>
	)
}

export default Ranking