import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { ForumContext } from '../../context/ForumContext';
import ForumMessage from './ForumMessage';




const ForumMessages = () => {

	const [messages, setMessages] = useState([])
	
	const {data} = useContext(ForumContext);
	
	useEffect( () => {
	
		const unSub = onSnapshot(doc(db, "forumChats", data.userForumId), (doc) => {
			doc.exists() && setMessages(doc.data().messages)
		})

		return() => {
			unSub();
		}

	
	}, [data.userForumId])

	console.log(messages);

	return (
		<div className="ForumChat">

			{
				// messages map
				messages.map((m, key) => {

					return <ForumMessage message={m} key={key} />

				})

			}

		</div>
	)
}

export default ForumMessages