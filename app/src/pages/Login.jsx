import React from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';


const Login = () => {
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        await signInWithEmailAndPassword(auth, email, password)



            .then((response) => {
                const res = response;
                
                console.log(res);                
                // Swal.fire('Success', ' ', 'success');
                navigate("/");

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}\n${errorMessage}`);

                const alertTime = 2000;

                errorCode === 'auth/user-not-found' ? Swal.fire({
                    title: 'Error!',
                    text: "User not found",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === 'auth/wrong-password' ? Swal.fire({
                    title: 'Error!',
                    text: "Wrong password",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === 'auth/missing-password' ? Swal.fire({
                    title: 'Error!',
                    text: "Missing password",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === 'auth/invalid-email' ? Swal.fire({
                    title: 'Error!',
                    text: "Invalid email",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === 'auth/too-many-requests' ? Swal.fire({
                    title: 'Error!',
                    text: "Access to this account has been temporarily disabled due to many failed login attempts. Please, try again later.",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: 4000
                })
                : console.log(`${errorCode}\n${errorMessage}`);


            })
        
    }

    
    
    return(


        <div className="entry loginContainer">
            
            
            <div className="formWrapper">
                
                <div id="ball1"></div>
                <div id="ball2"></div>
            

                <form action="" onSubmit={handleSubmit}>
                    <h1>login</h1>

                    <div className="inputs">
                        <label htmlFor="email">email</label>
                        <input id='email' type="email" />

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

                {/* <img src="../../src/assets/sampleImg.png" alt="test img" /> */}
                <img className='formWrapperImg eae' src="../../src/assets/DESIGN/logos/g2296.png" alt="test img" />
            </div>

            

        </div>
    )
}

export default Login