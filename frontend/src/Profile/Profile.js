import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Profile.css'

function Profile({username}) {
    return (
        <div className="profile">

           
            <div className="avatar__profile">
                <div className="friend__suggestions">
                    <div className="user">
                        <Avatar />
                        <div className="user__details">
                            <h5>{username}</h5>
                            <small>Follows you</small>
                        </div>
                    </div>
                </div>

                <div className="follow">
                    
                    <a href="#">Follow</a>
                </div>
                
            </div>
            
        </div>
    )
}

export default Profile
