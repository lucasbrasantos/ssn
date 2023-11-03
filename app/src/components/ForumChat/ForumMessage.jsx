import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ForumContext } from '../../context/ForumContext';


const ForumMessage = ({userForumId, message}) => {

	// console.log(message);
	// console.log(userForumId);
	
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

    	ref.current?.scrollIntoView({ behavior: "smooth" });

    }, [message]);

	///////////

	return (
		<div className="Fmsg" ref={ref}>
			<div className="FMD1">
				<img className='fAvatar' src={message.senderPhotoUrl || "../../../src/assets/Icon.png"} alt="" />
				<div><img onClick={() => updateLikesCount(userForumId, message.id, message.likes)} className='likeIcon' src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />{message.likes}</div>
			</div>
			<div className="FMD2">
				<p>{message.senderUsername}</p>
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