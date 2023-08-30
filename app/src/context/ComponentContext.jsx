import React from 'react'
import { createContext, useContext, useState } from "react"

const ComponentContext = createContext();

export const useComponentContext = () => {
	return useContext(ComponentContext);
}


export const ComponentProvider = ({ children }) => {

	const [selectedComponent, setSelectedComponent] = useState(null);

	const value = {
		selectedComponent,
		setSelectedComponent
	};

	return <ComponentContext.Provider value={value}>{children}</ComponentContext.Provider>
}