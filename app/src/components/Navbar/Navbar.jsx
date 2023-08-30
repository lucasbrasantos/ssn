import React from 'react'
import {Link} from 'react-router-dom'

import './style.scss'

const Navbar = () => {
  return (
    <nav className='navbar' id='navbar'>
                <span className='logo'>Logo</span>

                <div className="col1">
                    <span><Link to="/"><img src="../../../src/assets/icons/fluent-mdl2_home.png" alt="" /></Link></span>
                    <span><img src="../../../src/assets/icons/Vector.png" alt="" /></span>
                </div>

                <span className='searchSpan'>
                  <input name='search' className='search' type="text" placeholder='Pesquisar...' />
                </span>

                <div className="col2">
                    <span><img src="../../../src/assets/icons/fluent-mdl2_trophy.png" alt="" /></span>
                    <span><img src="../../../src/assets/icons/fluent-mdl2_office-chat.png" alt="" /></span>
                    <span><img src="../../../src/assets/icons/fluent-mdl2_message.png" alt="" /></span>
                </div>

                <img className="navbarAvatar" src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
            </nav>
  )
}

export default Navbar


