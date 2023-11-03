
import { createContext, useContext, useEffect, useReducer, useState } from "react";


export const SelectedPostContext = createContext()

export const SelectedPostContextProvider = ({children}) => {

    const INITIAL_STATE = {
        postId: null,
    }
    
    const forumReducer = (state,action) => {
        // console.log(state);
        // console.log(action);
        switch (action.type) {           
            
            case "SELECT_POST":
                
                return{

                    postId: action.payload.postId,
                };

            case "CLEAR_POST":
                
                return{

                    postId: null,
                };
                
        
            default:                
                return state;
        }
        
    }

    const [state, dispatch] = useReducer(forumReducer, INITIAL_STATE);
    console.log(state);
    return(
    
        <SelectedPostContext.Provider value={{ data:state, dispatch}}>
            {children}
        </SelectedPostContext.Provider>

    );

}