import React from 'react'
import '../styles/styles.scss'

const Login = () => {
    
    
    return(
        <div className="loginContainer">

            <div className="formWrapper">
                <form action="">
                    <h1>login</h1>

                    <div className="inputs">
                        <input type="text" />
                        <input type="password" />
                    </div>

                    <div className="buttons">
                        <button>entrar</button>
                        
                        <div className="line">
                            <hr />
                            <p>ou</p>
                            <hr />
                        </div>

                        <button>login com google</button>
                        <button>cadastrar-se</button>
                    </div>
                </form>

                <img src="https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg" alt="test img" />
            </div>

        </div>
    )
}

export default Login