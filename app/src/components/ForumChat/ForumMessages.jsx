import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { ForumContext } from '../../context/ForumContext';
import ForumMessage from './ForumMessage';




const ForumMessages = () => {

	const {data} = useContext(ForumContext);
	const [messages, setMessages] = useState([])
	
	useEffect( () => {
	
		const unSub = onSnapshot(query(collection(db, "forumChats", data.userForumId, "messages"), orderBy("date")), (doc) => {
			const messages = doc.docs.map((doc => doc.data()))
			setMessages(messages);
		})

		return() => {
			unSub();
		}

	
	}, [data.userForumId])
	

	return (
		<div className="ForumChat">

			{
				// messages map
				messages && Object.keys(messages).length > 0 && Object.entries(messages).map((m, key) => {

					return <ForumMessage userForumId={data.userForumId} m={m} key={key} />

				})

			}

		</div>
	)
}

export default ForumMessages