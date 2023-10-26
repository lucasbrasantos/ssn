import './style.scss'

const addFriend = () => {
    return(
        <div className="addFBox">
            <div className="fSearch">
                <input type="text" placeholder='Pesquisar...'/>
                <img src="../../../src/assets/icons/fluent-mdl2_Search.png" alt="" />
            </div>
            <div className="fList">

            
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>User</p>
                            <p>User Name</p>
                        </div>
                    </div>
                    <div className="infosF2">
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                            <p>N° Followers</p> 
                            <p>Rank User</p>
                        </div>
                        <img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
                    </div>
                </div>

                
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>User</p>
                            <p>User Name</p>
                        </div>
                    </div>
                    <div className="infosF2">
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                            <p>N° Followers</p> 
                            <p>Rank User</p>
                        </div>
                        <img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
                    </div>
                </div>
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>User</p>
                            <p>User Name</p>
                        </div>
                    </div>
                    <div className="infosF2">
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                            <p>N° Followers</p> 
                            <p>Rank User</p>
                        </div>
                        <img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
                    </div>
                </div>
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <p>User</p>
                            <p>User Name</p>
                        </div>
                    </div>
                    <div className="infosF2">
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', alignItems:'flex-end'}}>
                            <p>N° Followers</p> 
                            <p>Rank User</p>
                        </div>
                        <img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default addFriend;