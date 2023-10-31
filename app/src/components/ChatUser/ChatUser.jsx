import React, { useContext, useState } from 'react';
import './style.scss'
import { useComponentContext } from '../../context/ComponentContext';
import Messages from './Messages';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ChatUser = () => {

    const {setSelectedComponent} = useComponentContext();

	const handleButtonClick = (component) => {
		setSelectedComponent(component)
	}

    const {data} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);

    const handleKey = (e) => {
		e.code === "Enter" && handleSend();
	}

    const [text, setText] = useState("")
	const [img, setImg] = useState(null)


    const handleSend = async() => {
		if (img) {
			// console.log('eae');
			const storageRef = ref(storage, `${data.chatId}/${uuid()}`);
			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				(error) => {
					console.log(error);
				},
				() => {

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
						
					});
				}
			);

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

    return(
        <div className='chatDiv'>
            <div className="topChat">
                <img className='backHome' src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" onClick={() => handleButtonClick('chatAll')}/>
                <img src={data.user?.photoURL} className='userimg' alt="" />
                <p>{data.user?.displayName}</p>
            </div>

            <Messages />


            <div className="bottomChat">
                <input type="text" onKeyDown={handleKey} onChange={(e) => {setText(e.target.value)}} value={text}/>
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