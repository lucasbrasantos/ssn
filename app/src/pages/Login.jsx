import React from 'react'
import '../styles/styles.scss'

const Login = () => {
    
    
    return(
        <div className="loginContainer">
            
            
            <div className="formWrapper">
                
                <div id="ball1"></div>
                <div id="ball2"></div>
            

                <form action="">
                    <h1>login</h1>

                    <div className="inputs">
                        <label htmlFor="user">usuario</label>
                        <input id='user' type="text" />

                        <label htmlFor="password">senha</label>
                        <input id='password' type="password" />
                    </div>

                    <div className="buttons">
                        <button>Entrar</button>
                        
                        <div className="line">
                            <p>Ou</p>
                        </div>

                        <button id='googleBtn'>Login com Google</button>
                        <button>Cadastrar-se</button>
                    </div>
                </form>

                <img src="../../src/assets/sampleImg.png" alt="test img" />
            </div>

            

        </div>
    )
}

export default Login