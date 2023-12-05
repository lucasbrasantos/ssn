import React, { useContext, useState } from 'react';
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import { ForumContext } from '../../context/ForumContext';
import { AuthContext } from '../../context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuid } from "uuid";
import ForumMessages from './ForumMessages';
import Swal from 'sweetalert2';

const ForumChat = () => {


    const {setSelectedComponent} = useComponentContext();
    
    const {currentUser} = useContext(AuthContext); // current user
    const {data} = useContext(ForumContext); // forum data
    // console.log(data);


	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}


    function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}

    /////// handle send

    const [text, setText] = useState('');
    // const [img, setImg] = useState(null) por enquanto img nao


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
			
			
		}
        /* por enquando img nao
        else if (img) {
			// console.log('eae');
			
            const storageRef = ref(storage, `${user.userid}_${currentUser.uid}/forum/${data.chatId}/${uuid()}`); 	
			uploadFileAndHandleError(storageRef);

		}
        */
        else{
            console.log(currentUser);
			const messageId = uuid();  // id da mensagem


			await setDoc(doc(db, "forumChats", data.userForumId, "messages", messageId), {
				id: messageId, // id da mensagem
				text,
				likes: 0,
				senderId: currentUser.uid,
				senderUsername: currentUser.displayName,
				// senderName: data.forumBlock.user.name,
                senderPhotoUrl: currentUser.photoURL,
				date:Timestamp.now(),
			});

			/*
			await updateDoc(doc(db, "forumChats", data.userForumId), {
				
				[`messages.${messageId}`]: {
					id: messageId, // id da mensagem
					text,
					likes: 0,
					senderId: currentUser.uid,
					senderUsername: currentUser.displayName,
					// senderName: data.forumBlock.user.name,
                    senderPhotoUrl: currentUser.photoURL,
					date:Timestamp.now(),
				},
				
			});
			*/
		}

		setText("");
		// setImg(null)
        

    }
    


    return(
        <div className='ForumChatDiv'>
            <div className='ForumChatTop'>
                <div className='FT1'>
                    <img onClick={() => handleButtonClick('forum')} src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt=""/>
                    <p>{data.forumBlock.title}</p>
                </div>
                <div className='FT2'>
                
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src={data.forumBlock.user.photourl || "../../../src/assets/Icon.png"} alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>{`${data.forumBlock.user.name} | @${data.forumBlock.user.username}`}</p>
                            <p>{formatDateToYYYYMMDD(data.forumBlock.created_at)}</p>
                        </div>
                    </div>
                    <div className="infosF2">   
                        <p>{data.forumBlock.tag}</p>
                    </div>
                </div>
                </div>
            </div>
            
            <ForumMessages />

            <div className="ForumBottomChat">
                <input id="sendInput" type="text" onKeyDown={handleKey} onChange={(e) => {setText(e.target.value)}} value={text} />
                <input style={{display:'none'}} type="file" id='file'/>
                
                <label htmlFor="file">
                    <img src="../../../src/assets/icons/fluent-mdl2_photo-2-add.svg" alt="" />
                </label>
                <img src="../../../src/assets/icons/fluent-mdl2_send.svg" alt="" />
            </div>
        </div>
    )
}

export default ForumChat;