import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../../../firebase";
import { deleteUser } from "firebase/auth";


const DeleteUserData = async(data) => {
	

	const userIdToDelete = data.userId;
	// const userUidToDelete = data.userUid;


	try{

		console.log(userIdToDelete);
		// console.log(userUidToDelete);
		
		const res = await axios.delete('http://localhost:3000/delete_user', {
			params: {
				// id: 14,
				id: userIdToDelete,
			},
		})

		console.log(res);
		
		console.log('User data deleted successfully.');

		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
			  toast.onmouseenter = Swal.stopTimer;
			  toast.onmouseleave = Swal.resumeTimer;
			}
		});
		  Toast.fire({
			icon: "success",
			title: "Conta excluída com sucesso!"
		});

		setTimeout(() => {window.location.reload()}, 3200)
		
		let user = auth.currentUser

		deleteUser(user).then(() => {
			console.log('excluded in firebase!');
		}).catch((error) => {
			console.log(error);
		});



	} catch (error) {

		console.error('Error deleting user data:', error);

	}


}

export default DeleteUserData