
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { SelectedUserContext } from '../../context/SelectedUserContext';




const AddFriend = () => {

    const {currentUser} = useContext(AuthContext);
	const [currentUserAPI, setCurrentUserAPI] = useState({});	
	const [currentUserRanking, setCurrentUserRanking] = useState({});	
	const [friends, setFriends] = useState([])

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async() => {

        
        const res = await axios.get('http://localhost:3000/user_uid', {
                params: {
                uid: currentUser.uid,
            },
        })
        setCurrentUserAPI(res.data[0])


        await axios.get('http://localhost:3000/friendsUsrId', {
            params:{
                id: res.data[0].userid,
                queryType: 'isNotFriend'
            }
        }, )
        .then((res) => {
            setFriends(res.data)
        })
        .catch((err) => { console.error(err); });

        await  axios.get('http://localhost:3000/user_ranking', {
            params: {
                id: res.data[0].userid,
            },
        })
        .then((res) => {
            setCurrentUserRanking(res.data[0])
        })
        .catch((err) => { console.error(err)  });

	}


    const handleAddFriend = async(userid, useridfriend) => {
      
        // console.log(useridfriend);

        
        await axios.post('http://localhost:3000/friends', {
            "userid": userid,
            "useridfriend": useridfriend
        }) 
            .then(res => console.log(res))
            .catch(err => console.log(err))

        window.location.reload();	


    }


    /////////

    const {setSelectedComponent} = useComponentContext();
	const {dispatch} = useContext(SelectedUserContext)

	const handleChangeComponent = (component) => {
		setSelectedComponent(component)
	}

	const handleUserClick = (useridfriend) => {

		dispatch({type:"SELECT_USER", payload:{
			userId: useridfriend
		}})

        handleChangeComponent('userProfile')
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
                                <div className='infosF1' onClick={() => handleUserClick(e.useridfriend)} style={{cursor:'pointer'}}>
                                    <img className='fAvatar' src={e.photourl || "../../../src/assets/Icon.png"} alt="" />
                                    <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                        <p>{e.name}</p>
                                        <p>{e.username}</p>
                                    </div>
                                </div>
                                <div className="infosF2">
                                    <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                                        <p>Nº amigos: {e.num_friends}</p> 
                                        {/* <p>Ranking: 0</p> */}
                                    </div>
                                    <img onClick={() => {handleAddFriend(currentUserAPI.userid, e.useridfriend)}} style={{cursor:'pointer'}} src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
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