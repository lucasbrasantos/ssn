import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';


const UserContext = createContext();

export const useUser = () => {
	return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
	
	const [user, setUser] = useState(null);
	const {currentUser} = useContext(AuthContext)


  	useEffect(() => {
		
		axios.get('http://localhost:3000/user_uid', {
			params: {
			uid: currentUser.uid,
			},
			})
			.then((res) => {
				setUser(res.data[0])
			})
			.catch((err) => {
				console.error(err);
			});
  		}, []);

	const value = {
		user
	};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};