import React, { cloneElement } from 'react';
import '../styles/main.scss'


const Home = () => {
    return(
        <div className='HomeContainer'>
            <nav className='navbar'>
                <span className='logo'>Logo</span>

                <div className="col1">
                    <span>Icon1</span>
                    <span>Icon2</span>
                </div>

                <input className='search' type="text" placeholder='Pesquisar...'/>

                <div className="col2">
                    <span>Icon3</span>
                    <span>Icon4</span>
                    <span>Icon5</span>
                </div>

                <img className="avatar" src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
            </nav>

            <div className='postContainer'>

                <div className='postTop'>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
                        <img className="avatar" src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
                        <p>Nome de Ususario</p>
                    </div>
                    <button className='followBtn'>Seguir</button>
                </div>

                <div className='postImg'></div>
                <div className='postButton'></div>
            </div>
            
        </div>
    );
};

export default Home;