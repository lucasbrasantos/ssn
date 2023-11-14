
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import './style.scss'




const AddFriend = () => {

    const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState();	
	const [friends, setFriends] = useState([])

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async() => {

		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  	})
		.then((res) => {
			setCurrentUserAPI(res.data[0])
			
		})
		.catch((err) => { console.error(err)  });	

	}
	if (currentUserAPI && friends.length < 1) {
		axios.get('http://localhost:3000/friendsUsrId', {
			params:{
				id: currentUserAPI && currentUserAPI.userid,
				queryType: 'isNotFriend'
			}
		}, )
			.then((res) => { setFriends(res.data) })
			.catch((err) => { console.error(err); });
	}
    

    const handleAddFriend = (useridfriend) => {
      
        // console.log(e);

        


    }

    return(
        <div className="addFBox">
            <div className="fSearch">
                <input type="text" placeholder='Pesquisar...'/>
                <img src="../../../src/assets/icons/fluent-mdl2_Search.png" alt="" />
            </div>
            <div className="fList">

            
                {

                    friends ? friends.map((e, key) => {
                        if (e.useridfriend == currentUserAPI.userid) {
                            return;
                        }
                        return(

                            <div className="friendS" key={key}>
                                <div className='infosF1'>
                                    <img className='fAvatar' src={e.photourl || "../../../src/assets/Icon.png"} alt="" />
                                    <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                        <p>{e.name}</p>
                                        <p>{e.username}</p>
                                    </div>
                                </div>
                                <div className="infosF2">
                                    <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                                        <p>{e.num_friends}</p> 
                                        <p>Rank User</p>
                                    </div>
                                    <img onClick={() => {handleAddFriend(e.useridfriend)}} style={{cursor:'pointer'}} src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
                                </div>
                            </div>
                            
                        )
                    }) : <p style={{color:'white'}}>nada por enquanto</p>

                }
                

                
            </div>
        </div>
    )
}

export default AddFriend;