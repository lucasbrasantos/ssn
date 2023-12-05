import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { ForumContext } from '../../context/ForumContext';
import { AuthContext } from '../../context/AuthContext';


const ForumMessage = ({userForumId, m}) => {

	const {currentUser} = useContext(AuthContext)

	// console.log(m);
	// console.log(userForumId);

	const message = m[1];
	const [newMessageUploaded, setNewMessageUploaded] = useState(true);
	
	function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}

	const newFormatedDate = formatDateToYYYYMMDD(message.date.toDate())
	// console.log(newFormatedDate);
	// console.log(message.date.toDate());

	const ref = useRef();
	
	useEffect(() => {
		if (newMessageUploaded) {
			ref.current.scrollIntoView({ behavior: "smooth" });
			setNewMessageUploaded(false);
			
		}

		

	}, [newMessageUploaded]);

	///////////	

	const [liked, setLiked] = useState(false)
	
	
	useEffect( () => {
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'forumMessages');


		const unSub = onSnapshot(query(likesCollectionRef), (doc) => {
			const _liked = doc.data()[userForumId][message.id].liked
			setLiked(_liked);
			changeLikeIcon(_liked);
		})

		return() => {
			unSub();
		}

	
	}, [userForumId, message.id])


	const updateLikesCount = async(userForumId, messageId, messageLikes) => {
		
		const messageCombinedId = `${userForumId}.${messageId}`;
		const messageDocRef = doc(db, 'forumChats', userForumId, 'messages', messageId);
		const likesCollectionRef = doc(db, 'users', currentUser.uid, 'likes', 'forumMessages');
		
		
		const res = await getDoc(likesCollectionRef);
		
		// console.log(res.data());

		const likesDocData = res.data();

		if (!res.exists()) { // se nao existir o documento
			// If the user's 'likes' document doesn't exist, create it and add the likes
			await setDoc(likesCollectionRef, {}); // criar
		}

		

		if (!likesDocData || !likesDocData[userForumId] || !likesDocData[userForumId][messageId]) {
			
			await updateDoc(likesCollectionRef, {
				[messageCombinedId]: {
					liked: true,
				},
			});
	
			await updateDoc(messageDocRef, {
				likes: messageLikes+1,
			});

		}else{ // senao ele ja foi criado e ja foi curtido...

			let vigia = likesDocData[userForumId][messageId].liked // inical value = true

			await updateDoc(likesCollectionRef, {
				[messageCombinedId]: {
					liked: !vigia,
				},
			});
	
			
			await updateDoc(messageDocRef, {
				likes: !vigia ? messageLikes+1 : messageLikes-1,
			});

			changeLikeIcon(!vigia);
			// changeLikeIcon(!liked)
			
		}
		
	}

	const changeLikeIcon = (isLiked) => {
		const likeIcon = document.getElementById(`likeIcon_${message.id}`)
		if (isLiked) {
			console.log('tá curtido');
			
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart_red.svg';
		}else{
			console.log('não tá curtido');
			
			likeIcon.src = '../../../src/assets/icons/fluent-mdl2_heart.svg';
		}
	}

	return (
		<div className="Fmsg" ref={ref}>
			<div className="FMD1">
				<img className='fAvatar' src={message.senderPhotoUrl || "../../../src/assets/Icon.png"} alt="" />
				<div><img onClick={(e) => updateLikesCount(userForumId, message.id, message.likes)} id={`likeIcon_${message.id}`} className='likeIcon' src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{message.likes}</div>
			</div>
			<div className="FMD2">
				<p>@{message.senderUsername}</p>
				<p>{newFormatedDate.split(" ")[0]}</p>
				<p>{newFormatedDate.split(" ")[1]}</p>
			</div>
			<div className="FMD3">
				<p>{message.text}</p>
			</div>
		</div>
	)
}

export default ForumMessage