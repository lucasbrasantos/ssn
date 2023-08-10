import React from 'react';
import '../styles/HomeStyle.scss';

const Home = () => {
    return(
        <div className='HomeContainer'>
            <nav className='navbar'>
                <span className='logo'>Logo</span>
                <span>Icon1</span>
                <span>Icon2</span>

                <input className='search' type="text" placeholder='Pesquisar...'/>

                <span>Icon3</span>
                <span>Icon4</span>
                <span>Icon5</span>

                <img className="avatar" src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
            </nav>
        </div>
    );
};

export default Home;