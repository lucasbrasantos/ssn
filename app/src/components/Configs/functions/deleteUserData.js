import axios from "axios";


const DeleteUserData = async(data) => {
	

	const userIdToDelete = data.userId;
	// const userUidToDelete = data.userUid;


	try{

		console.log(userIdToDelete);
		// console.log(userUidToDelete);

		const res = await axios.delete('http://localhost:3000/delete_user', {
			params: {
				id: userIdToDelete,
			},
		})

		console.log(res);

		console.log('User data deleted successfully.');


	} catch (error) {

		console.error('Error deleting user data:', error);

	}


}

export default DeleteUserData