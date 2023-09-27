import React from 'react'


import './style.scss';

const RankUser = (props) => {
    return (
        <div id='RankUser'>
            <p className='RankPosition'>{props.ranking}º</p>
            <img src="../../../src/assets/icons/fluent-mdl2_trophy.png" alt="" className='Trophy'/>
            <img src="../../../src/assets/IconDark.png" alt="" />
            <div className="box">
                <p className='username'>{props.name}</p>
                {/* <p className='userInfo'>info usuario</p> */}
            </div>

            <button>Points: {props.points}</button>	

        </div>
    )
}

export default RankUser