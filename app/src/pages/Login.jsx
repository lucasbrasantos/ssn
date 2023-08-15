import React from 'react'
import {useNavigate} from 'react-router-dom'


const Login = () => {
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
                 
        navigate('/');
    }

    
    
    return(


        <div className="entry loginContainer">
            
            
            <div className="formWrapper">
                
                <div id="ball1"></div>
                <div id="ball2"></div>
            

                <form action="" onSubmit={handleSubmit}>
                    <h1>login</h1>

                    <div className="inputs">
                        <label htmlFor="user">usuario</label>
                        <input id='user' type="text" />

                        <label htmlFor="password">senha</label>
                        <input id='password' type="password" />
                    </div>

                    <div className="buttons">
                        <button type='submit'>Entrar</button>
                        
                        <div className="line">
                            <p>Ou</p>
                        </div>

                        <button type='button' id='googleBtn'>Login com Google</button>
                        <button type='button' onClick={ () => {
                          navigate('/register');
                        }} >Cadastrar-se</button>
                    </div>
                </form>

                <img src="../../src/assets/sampleImg.png" alt="test img" />
            </div>

            

        </div>
    )
}

export default Login