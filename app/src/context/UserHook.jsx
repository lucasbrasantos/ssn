
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const getUser = async(uid) => {
	
	const [user, setUser] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async() => {
		await axios.get('http://localhost:3000/user_uid', {
			params: {
			uid: uid,
			},
			})
			.then((res) => {
				setUser(res.data[0])
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return user
	
}



