import React from 'react'
import '../styles/main.scss'




const Register = () => {

    
    return(
        <div className="entry registerContainer">
            
            
            <div className="formWrapper">
                
                <div id="ball1"></div>
                <div id="ball2"></div>
            
                <img src="../../src/assets/sampleImg.png" alt="test img" />

                <form action="">
                    <h1>registro</h1>


                    <div className="inputs">
                        <label htmlFor="user">nome</label>
                        <input id='user' type="text" />

                        <label htmlFor="password">email</label>
                        <input id='email' type="password" />

                        <label htmlFor="password">senha</label>
                        <input id='senha' type="password" />

                        <label htmlFor="password">confirmar senha</label>
                        <input id='re-senha' type="password" />
                    </div>

                    <div className="buttons">
                        <button>Cadastrar</button>
                        
                        <div className="line">
                            <p>Ou</p>
                        </div>

                        <button id='googleBtn'>Login com Google</button>
                        <button>Login</button>
                    </div>
                </form>

            </div>

            

        </div>
    )
}

export default Register