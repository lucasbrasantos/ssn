

const DeleteUserData = (data) => {
	

	const userIdToDelete = data.userId;
	const userUidToDelete = data.userUid;


	try{

		console.log(userIdToDelete);
		console.log(userUidToDelete);
		
		console.log('User data deleted successfully.');


	} catch (error) {

		console.error('Error deleting user data:', error);

	}


}

export default DeleteUserData