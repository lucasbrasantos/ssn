import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import { ComponentProvider } from './context/ComponentContext.jsx'
import { AuthContext } from './context/AuthContext.jsx';

import './styles/main.scss';
import NotFound from './pages/NotFound';
import { ForumContextProvider } from './context/ForumContext';


const App = () => {


    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        }else return children
    }



	return (
		<BrowserRouter>
            <Routes>
                <Route path="/">
                    
                    <Route index element={ 

                            <ProtectedRoute>
                                <ForumContextProvider>
                                    <ComponentProvider>
                                        <Home/> 
                                    </ComponentProvider>
                                </ForumContextProvider>
                            </ProtectedRoute>
                    } />

                    <Route path="Register" element={<Register/>} />
                    <Route path="Login" element={<Login/>} />
                    <Route path="*" element={ <NotFound/> } />
                </Route>
            </Routes>

        
        </BrowserRouter>
	)
}

export default App
