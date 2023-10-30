import React from 'react';
import './style.scss'

const ChatUser = () => {
    return(
        <div className='chatDiv'>
            <div className="topChat">
                <img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" />
                <img src="../../../src/assets/Icon.png" alt="" />
                <p>Nome usuario</p>
            </div>

            <div className="msgChat">
                <div className='sentMsg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum libero odio maiores neque eum, eligendi culpa necessitatibus iusto veniam et dignissimos impedit magnam quae, ducimus quo! Unde quae natus a?</p>    
                </div> 
                <div className="receivedMsg">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sit iure voluptatum quisquam magnam quia, vel nostrum, id modi asperiores inventore vero temporibus nihil laboriosam corrupti blanditiis doloremque placeat dicta!</p>    
                </div>  
                <div className='sentMsg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum libero odio maiores neque eum, eligendi culpa necessitatibus iusto veniam et dignissimos impedit magnam quae, ducimus quo! Unde quae natus a?</p>    
                </div> 
                <div className='sentMsg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum libero odio maiores neque eum, eligendi culpa necessitatibus iusto veniam et dignissimos impedit magnam quae, ducimus quo! Unde quae natus a?</p>    
                </div> 
                <div className="receivedMsg">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sit iure voluptatum quisquam magnam quia, vel nostrum, id modi asperiores inventore vero temporibus nihil laboriosam corrupti blanditiis doloremque placeat dicta!</p>    
                </div>
                <div className="receivedMsg">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sit iure voluptatum quisquam magnam quia, vel nostrum, id modi asperiores inventore vero temporibus nihil laboriosam corrupti blanditiis doloremque placeat dicta!</p>    
                </div>
                <div className="receivedMsg">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sit iure voluptatum quisquam magnam quia, vel nostrum, id modi asperiores inventore vero temporibus nihil laboriosam corrupti blanditiis doloremque placeat dicta!</p>    
                </div>
                
            </div>

            <div className="bottomChat">
                <input type="text" />
                <img src="../../../src/assets/icons/fluent-mdl2_send.svg" alt="" />
            </div>
        </div>
    )
}

export default ChatUser;