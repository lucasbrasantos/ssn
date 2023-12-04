import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useComponentContext } from '../../context/ComponentContext';
import { SelectedUserContext } from '../../context/SelectedUserContext';

const FriendsMenu = () => {


	const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState({});	
	const [friends, setFriends] = useState([])

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async() => {

		try {			
		
			const res = await axios.get('http://localhost:3000/user_uid', {
					params: {
					uid: currentUser.uid,
				},
			})
			setCurrentUserAPI(res.data[0])


			await axios.get(`http://localhost:3000/friendsUsrId`, {
				params:{
					id: res.data[0]?.userid,
					queryType: 'isFriend'
				}
			}, )
			.then((res) => { setFriends(res.data) })
			.catch((err) => { console.error(err); });

		} catch (error) {
			console.log(error);
		}
	}
	
	// console.log(friends);
	// console.log(currentUserAPI);

	//////////////////

	const {setSelectedComponent} = useComponentContext();
	const {selectedComponent} = useComponentContext();
	const {dispatch} = useContext(SelectedUserContext)

	const handleChangeComponent = (component) => {
		setSelectedComponent(component)
	}

	const handleUserClick = (e) => {
		console.log(e);
		// console.log(selectedComponent);
		
		dispatch({type:"SELECT_USER", payload:{
			userId: e.useridfriend
		}})

		if (selectedComponent == 'userProfile') {
			handleChangeComponent('nothing')
        	
			setTimeout(() => {
				handleChangeComponent('userProfile')
			}, 100)
		}else{

			handleChangeComponent('userProfile')
		}

    }
  
	return (
		<div className='boxF'>
			<div className="fContent">

				
				<div className="friendsTitle">
					<h1 style={{textAlign:'center'}}>Amigos</h1>
					<img src="../../../src/assets/icons/fluent-mdl2_people.svg" alt="" />
				</div>
				
				<div className="friendsContainer">

					{
						friends && friends.map((e, key) => {

							return(
								<div key={key} className='friends' onClick={() => {handleUserClick(e)}}>
									<img className='friendsPhotoUrl' src={e.photourl} alt="" />
									<p>{e.name}</p>
								</div>
							)
						})

					}
				</div>
			</div>


		</div>
		
	)
}

export default FriendsMenu