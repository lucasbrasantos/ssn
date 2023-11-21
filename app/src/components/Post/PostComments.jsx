import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import PostComment from './PostComment'


const PostComments = ({_postId}) => {

	const [messages, setMessages] = useState([])

	useEffect( () => {
	
		const unSub = onSnapshot(query(collection(db, "postComments", _postId, "messages"), orderBy("date")), (doc) => {
			const messages = doc.docs.map((doc => doc.data()))
			setMessages(messages);
		})

		return() => {
			unSub();
		}

	
	}, [_postId])


	return (
		
		<div id='comments'>

		
		{
			// messages map
			messages && Object.keys(messages).length > 0 ? Object.entries(messages).map((m, key) => {
				
				return <PostComment _postId={_postId} m={m} key={key} />
				
			}) : <p style={{padding:'12px 0', textAlign:'center'}}>nenhum comentário</p>
			
		}
		

		</div>

	)
}

export default PostComments