import './style.scss'

const ForumChat = () => {
    return(
        <div className='ForumChatDiv'>
            <div className='ForumChatTop'>
                <div className='FT1'>
                    <img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt=""/>
                    <p>Name Forum</p>
                </div>
                <div className='FT2'>
                
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>User Name</p>
                            <p>Criado em: 465/23/845</p>
                        </div>
                    </div>
                    <div className="infosF2">   
                        <p>Tag</p>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="ForumChat">
                <div className="Fmsg">
                    <div className="FMD1">
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
                    </div>
                    <div className="FMD2">
                        <p>Nome User</p>
                        <p>date time</p>
                    </div>
                    <div className="FMD3">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi soluta officiis dolorem libero modi laudantium voluptatibus consectetur. Reiciendis nemo, alias perspiciatis placeat aspernatur facilis officia atque quam, maiores esse laudantium.</p>
                    </div>
                </div>

                <div className="Fmsg">
                    <div className="FMD1">
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <img src="../../../src/assets/icons/fluent-mdl2_heart.png" alt="" />
                    </div>
                    <div className="FMD2">
                        <p>Nome User</p>
                        <p>date time</p>
                    </div>
                    <div className="FMD3">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi soluta officiis dolorem libero modi laudantium voluptatibus consectetur. Reiciendis nemo, alias perspiciatis placeat aspernatur facilis officia atque quam, maiores esse laudantium.</p>
                    </div>
                </div>
            </div>

            <div className="ForumBottomChat">
                <input type="text"/>
                <input style={{display:'none'}} type="file" id='file'/>
                
                <label htmlFor="file">
                    <img src="../../../src/assets/icons/fluent-mdl2_photo-2-add.svg" alt="" />
                </label>
                <img src="../../../src/assets/icons/fluent-mdl2_send.svg" alt="" />
            </div>
        </div>
    )
}

export default ForumChat;