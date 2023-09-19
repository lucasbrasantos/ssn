import React from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';
import RankUser from '../RankUser/RankUser';

const Ranking = () => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


	return (
		<div id='Ranking'>
			<h1>Ranking</h1>
			
			
			<RankUser ranking={1} points={2000}/>
			<RankUser ranking={2} points={1384}/>
			<RankUser ranking={3} points={1200}/>

		</div>
	)
}

export default Ranking