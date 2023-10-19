import './style.scss'

const addFriend = () => {
    return(
        <div className="addFBox">
            <div className="fSearch">
                <input type="text" />
                <img src="../../../src/assets/icons/fluent-mdl2_Search.png" alt="" />
            </div>
            <div className="fList">
                <div className="friendS">
                    <div className='infosF1'>
                        <img className='fAvatar' src="../../../src/assets/Icon.png" alt="" />
                        <div>
                            <p>User</p>
                            <p>User Name</p>
                        </div>
                    </div>
                    <div className="infosF2">
                        <div>
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