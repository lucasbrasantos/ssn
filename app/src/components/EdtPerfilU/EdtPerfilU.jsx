import React from 'react';
import './style.scss';

const EdtPerfilU = () => {

    


    return(
        <div className="EdtUD">
            <form className='FormEdtU' action="">
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor="file">
                    <img className='EdtAvatarUser' src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
                    <span>Edit Avatar</span>
                </label>
                <input className='inputEdtU' type="text" placeholder='Name'/>
                <input className='inputEdtU' type="text" placeholder='User Name'/>
                <textarea className='inputEdtU' placeholder='Bio' cols="30" rows="10"></textarea>
            </form>

            <button className='BtnSaveEdtU'>
                Salvar
            </button>

        </div>
    )
}

export default EdtPerfilU;