
import { createContext, useContext, useEffect, useReducer, useState } from "react";


export const CommentContext = createContext();

export const CommentContextProvider = ({children}) => {

    const INITIAL_STATE = {
        _postId:"null",
    }
    
    const commentReducer = (state,action) => {
        // console.log(state);
        // console.log(action);
        switch (action.type) {           
            
            case "CHANGE_COMMENT":
                
                return{

                    _postId: action.payload._postId,
                };
                
        
            default:                
                return state;
        }
        
    }

    const [state, dispatchComment] = useReducer(commentReducer, INITIAL_STATE);
    // console.log(state);
    return(
    
        <CommentContext.Provider value={{ data:state, dispatchComment}}>
            {children}
        </CommentContext.Provider>

    );

}