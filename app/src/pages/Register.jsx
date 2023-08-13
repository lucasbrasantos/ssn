import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


import '../styles/main.scss'




const Register = () => {
    
    const navigate = useNavigate();
    const [values, setValues] = useState({});

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        setValues({
            'user': e.target[0].value,
            'email': e.target[1].value,
            'senha': e.target[2].value,
            're_senha': e.target[3].value
        })

        // const displayName = e.target[0].value.toLowerCase();
        // const email = e.target[1].value;
        // const password = e.target[2].value;

        navigate('/');
    }
    
    return(
        <div className="entry registerContainer">
            
            
            <div className="formWrapper">
                
                <div id="ball1"></div>
                <div id="ball2"></div>
            
                <img src="../../src/assets/sampleImg.png" alt="test img" />

                <form action="" onSubmit={handleSubmit}>
                    <h1>registro</h1>


                    <div className="inputs">
                        <label htmlFor="user">nome</label>
                        <input name='user' id='user' type="text" />

                        <label htmlFor="password">email</label>
                        <input name='email' id='email' type="email" />

                        <label htmlFor="password">senha</label>
                        <input name='senha' id='senha' type="password" />

                        <label htmlFor="password">confirmar senha</label>
                        <input name='re-senha' id='re-senha' type="password" />
                    </div>

                    <div className="buttons">
                        <button type='submit'>Cadastrar</button>
                        
                        <div className="line">
                            <p>Ou</p>
                        </div>

                        <button type='button' id='googleBtn'>Login com Google</button>
                        <button type='button' onClick={ () => {
                          navigate('/login');
                        }} >Login</button>
                    </div>
                </form>

            </div>

            

        </div>
    )
}

export default Register