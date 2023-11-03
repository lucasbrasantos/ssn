import React, { useEffect, useState } from 'react'

import './style.scss'
import RankUser from '../RankUser/RankUser';
import axios from 'axios'

const Ranking = () => {


	const [data, setData] = useState([]);


	useEffect(() => {
		
		axios.get('http://localhost:3000/users', {
		  params: {
			limit: 5,      // Limit the results to 5 users
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
				data.slice().sort((a,b) => b.points- a.points).map((e, i) => {
				
					// console.log(e.userid);

					return(
						<RankUser
							name={e.name}
							points={e.points}
							ranking={i+1}
							key={e.userid}
							userid={e.userid}
						/>
					)}
				)

				

			}

		</div>
	)
}

export default Ranking