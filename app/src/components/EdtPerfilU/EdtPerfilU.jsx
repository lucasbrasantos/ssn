import React from 'react';
import './style.scss';

const EdtPerfilU = () => {

    


    return(
        <div className="EdtUD">
            <form className='FormEdtU' action="">
                <img className='EdtAvatarUser' src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
                <input className='inputEdtU' type="text" placeholder='Name'/>
                <input className='inputEdtU' type="text" placeholder='User Name'/>
                <textarea className='inputEdtU' placeholder='Bio' cols="30" rows="10"></textarea>
                <button className='BtnSaveEdtU'>
                    Salvar
                </button>
            </form>
        </div>
    )
}

export default EdtPerfilU;