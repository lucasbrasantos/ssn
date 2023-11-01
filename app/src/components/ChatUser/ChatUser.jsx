import React, { useContext, useEffect, useState } from 'react';
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import Messages from './Messages';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import Swal from 'sweetalert2';

const ChatUser = () => {

    const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

    const {data} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);

	const [user, setUser] = useState()

	useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async() => {
		await axios.get('http://localhost:3000/user_uid', {
			params: {
			  uid: currentUser.uid,
			},
		  	})
		.then((res) => { setUser(res.data[0]) })
		.catch((err) => { console.error(err); });		
	}

	//////



    const handleKey = (e) => {
		
		if (e.key === 'Enter') {
			if (text.trim() === '') {
				e.preventDefault(); // Prevent default behavior of submitting the form on Enter press
	
				Swal.fire({
					title: 'Erro!',
					text: "Por favor, escreva algo antes de enviar.",
					icon: 'error',
					confirmButtonText: 'Retornar',
					timer: 2000,
					timerProgressBar: true,
				});
			} else {
				handleSend();
			}
		}
		
	}

    const [text, setText] = useState("")
	const [img, setImg] = useState(null)


    const handleSend = async() => {
		if (text.trim() == '') {
			
			Swal.fire({
				title: 'Erro!',
				text: "Por favor, escreva algo antes de enviar.",
				icon: 'error',
				confirmButtonText: 'Retornar',
				timer: 2000,
				timerProgressBar: true,
			})
			
		}else if (img) {
			// console.log('eae');
			const storageRef = ref(storage, `${user.userid}_${currentUser.uid}/chats/${data.chatId}/${uuid()}`);			
			uploadFileAndHandleError(storageRef);

		}else{
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date:Timestamp.now(),
				}),
				
			});
		}

		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text
			},
			[data.chatId+".date"]: serverTimestamp()
		})

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId+".lastMessage"]: {
				text
			},
			[data.chatId+".date"]: serverTimestamp()
		})

		setText("");
		setImg(null)
	
	}


	const uploadFileAndHandleError = async(storageRef) => {
		
		
		const uploadTask = uploadBytesResumable(storageRef, img);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Listener for monitoring the upload progress.
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);

				if (progress === 100) {
					// Upload is 100% complete
					
					// console.log('aeaeae');
					// setPoints(points + 5)
					
					getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
						console.log('File available at', downloadURL);

						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId:currentUser.uid,
								date:Timestamp.now(),
								img:downloadURL,
							}),
						});
						
					}).catch((error) => {
						
						console.log(error);
						console.log(error.code);

						if (error.code == 'storage/object-not-found') {
							console.log("Retrying...");
							uploadFileAndHandleError(storageRef); // rerun the function
						}

					})
				}
			},
			(error) => {
				console.log(error);
			}
		)
	}




    return(
        <div className='chatDiv'>
            <div className="topChat">
                <img className='backHome' src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" onClick={() => handleButtonClick('chatAll')}/>
                <img src={data.user?.photoURL} className='userimg' alt="" />
                <p>{data.user?.displayName}</p>
            </div>

            <Messages />


            <div className="bottomChat">
                <input id='sendInput' type="text" onKeyDown={handleKey} onChange={(e) => {setText(e.target.value)}} value={text}/>
                <input style={{display:'none'}} type="file" id='file' onChange={(e) => {setImg(e.target.files[0])}} />
                
                <label htmlFor="file">
                    <img className='imgArrow' src="../../../src/assets/icons/fluent-mdl2_photo-2-add.svg" alt="" />
                </label>
                <img className='sendArrow' src="../../../src/assets/icons/fluent-mdl2_send.svg" onClick={() => handleSend()} alt="" />
            </div>
        </div>
    )
}

export default ChatUser;