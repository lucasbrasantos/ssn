import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={ <Home/> } />
                    <Route path="Register" element={<Register/>} />
                    <Route path="Login" element={<Login/>} />
                </Route>
            </Routes>

        
        </BrowserRouter>
	)
}

export default App
