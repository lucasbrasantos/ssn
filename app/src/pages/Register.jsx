import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.js";
import axios from 'axios';




const Register = () => {
    

    const navigate = useNavigate();
    const alertTime = 2000;

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const name = e.target[0].value;
        const username = e.target[1].value;
        const email = e.target[2].value;
        const senha = e.target[3].value;
        
        const basePhotoUrl = 'https://dummyimage.com/200x200.png/5fa2dd/ffffff'
        const dateNow = () => {
            let date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

            let parts = date.split(', ');                
            let dateParts = parts[0].split('/');
            let timeParts = parts[1].split(':');

            return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0] + ' ' + timeParts[0] + ':' + timeParts[1] + ':' + timeParts[2];
        } 

        await createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userUid = user.uid
                       
            
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: basePhotoUrl
            }).then(res => {
                console.log('success');
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            
            console.log(user); // log user after profile is updated

            
            axios.post('http://localhost:3000/users', {
                username: username,
                name: name,
                email: email,
                photourl: basePhotoUrl,
                points: 0,
                timecreated: dateNow(),
                firebase: userUid,
                description: ''
            })
            .then((res) => {
                console.log(res);

            })
            .catch((error) => {
                console.log(error);
                
            }); 


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