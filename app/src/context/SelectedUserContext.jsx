
import { createContext, useContext, useEffect, useReducer, useState } from "react";


export const SelectedUserContext = createContext()

export const SelectedUserContextProvider = ({children}) => {

    const INITIAL_STATE = {
        userId: null,
    }
    
    const userReducer = (state,action) => {
        // console.log(state);
        // console.log(action);
        switch (action.type) {           
            
            case "SELECT_USER":
                
                return{

                    userId: action.payload.userId,
                };

            case "CLEAR_USER":
                
                return{

                    userId: null,
                };
                
        
            default:                
                return state;
        }
        
    }

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(state);
    return(
    
        <SelectedUserContext.Provider value={{ data:state, dispatch}}>
            {children}
        </SelectedUserContext.Provider>

    );

}