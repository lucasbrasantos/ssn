import React from 'react'

const PostComment = ({m}) => {
 
	const c = m[1];
	console.log(c);

	function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}

	

	return (
		<div className="commentBox" >
			<div>
				<img className='commentUserAvatar' src={c ? c.senderPhotoUrl : "../../../src/assets/Profile-Avatar-PNG.png"} alt="userphoto" />
			</div>
			<div style={{marginRight:'47px'}}>
				<div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom:'10px'}}>
					<p>
						{c ? c.senderUsername : 'usuario'}
					</p>
					<p>{c ? formatDateToYYYYMMDD(c.date.toDate()) : 'data'}</p>
				</div>
				<p>
					{c ? c.text : 'comment'}
				</p>
			</div>
		</div>
	)
}

export default PostComment