import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";




const Register = () => {
    

    const navigate = useNavigate();
    const alertTime = 2000;

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const name = e.target[0].value;
        const username = e.target[1].value;
        const email = e.target[2].value;
        const senha = e.target[3].value;

        // const displayName = e.target[0].value.toLowerCase();
        // const email = e.target[1].value;
        // const password = e.target[2].value;

        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userUid = user.uid
            
            console.log(user);              

            // axios.post (user)

            navigate('/');
            // ..
        })
        .catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn(`${errorCode}\n${errorMessage}`);
                

                errorCode === "auth/invalid-email" ? Swal.fire({
                    title: 'Error!',
                    text: "Invalid email",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/weak-password" ? Swal.fire({
                    title: 'Error!',
                    text: `Weak password, password should be at least 6 characters`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/email-already-in-use" ? Swal.fire({
                    title: 'Error!',
                    text: `Email already in use! try again with another email`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/missing-email" ? Swal.fire({
                    title: 'Error!',
                    text: `Missing email`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })             
                : console.warn(`Diferent error: ${errorCode}\n${errorMessage}`);


        });

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
                        <label htmlFor="name">nome</label>
                        <input name='name' id='name' type="text" />

                        <label htmlFor="username">username</label>
                        <input name='username' id='username' type="text" />

                        <label htmlFor="password">email</label>
                        <input name='email' id='email' type="email" />

                        <label htmlFor="password">senha</label>
                        <input name='senha' id='senha' type="password" />

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