import React, { useContext } from 'react'


import './style.scss';
import { SelectedUserContext } from '../../context/SelectedUserContext';
import { useComponentContext } from '../../context/ComponentContext';

const RankUser = (props) => {

    const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

    const userId = props.userid;
    
    const {dispatch} = useContext(SelectedUserContext)

    const handleUserClick = () => {

        handleSelect({
            userId: userId
        })
        handleButtonClick('userProfile')
    }

    const handleSelect = (u) => {

        dispatch({type:"SELECT_USER", payload:u})
    }

    return (
        <div id='RankUser' onClick={() => handleUserClick()}>
            <p className='RankPosition'>{props.ranking}º</p>
            <img src="../../../src/assets/icons/fluent-mdl2_trophy.png" alt="" className='Trophy'/>
            <img className='rankingUserIcon' src={props.photourl || "../../../src/assets/IconDark.png"} alt="" />
            <div className="box">
                <p className='username'>{props.name}</p>
                {/* <p className='userInfo'>info usuario</p> */}
            </div>

            <button>Points: {props.points}</button>	

        </div>
    )
}

export default RankUser