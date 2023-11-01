import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ForumContext = createContext();

export const ForumContextProvider = ({children}) => {

    const INITIAL_STATE = {
        userForumId:"null",
        forumBlock:{}
    }
    
    const forumReducer = (state,action) => {
        // console.log(state);
        // console.log(action);
        switch (action.type) {           
            
            case "CHANGE_FORUM":
                
                return{

                    userForumId: action.payload.userForumId,
                    forumBlock: action.payload.forumBlock,
                };
                
        
            default:                
                return state;
        }
        
    }

    const [state, dispatch] = useReducer(forumReducer, INITIAL_STATE);
    console.log(state);
    return(
    
        <ForumContext.Provider value={{ data:state, dispatch}}>
            {children}
        </ForumContext.Provider>

    );

}