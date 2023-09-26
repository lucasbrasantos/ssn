import React, { useEffect, useState } from 'react'

import './style.scss'
import { useComponentContext } from '../../context/ComponentContext.jsx';
import RankUser from '../RankUser/RankUser';
import axios from 'axios'

const Ranking = () => {

	const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

	const [data, setData] = useState([]);


	useEffect(() => {
		
		axios.get('http://localhost:3000/users', {
		  params: {
			limit: 6,      // Limit the results to 5 users
		  },
		})
		.then((res) => {
		  setData(res.data);
		})
		.catch((err) => {
		  console.error(err);
		});
	  }, []);

	return (
		<div id='Ranking'>
			<h1>Ranking</h1>
			
			
			{
				data.slice().sort((a,b) => b.points- a.points).map((e, i) => (
					<RankUser
					name={e.name}
					points={e.points}
					ranking={i+1}
					/>
				))

				

			}

		</div>
	)
}

export default Ranking