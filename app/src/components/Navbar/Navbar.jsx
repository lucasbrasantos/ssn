import React from 'react'
import './style.scss'

const Navbar = () => {
  return (
    <nav className='navbar' id='navbar'>
                <span className='logo'>Logo</span>

                <div className="col1">
                    <span><img src="../assets/icons/fluent-mdl2_home.png" alt="" />a</span>
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
  )
}

export default Navbar


