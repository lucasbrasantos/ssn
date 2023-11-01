import React from 'react'


const ForumMessage = ({message}) => {

	console.log(message);
	
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

	return (
		<div className="Fmsg">
			<div className="FMD1">
				<img className='fAvatar' src={message.senderPhotoUrl || "../../../src/assets/Icon.png"} alt="" />
				<img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
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