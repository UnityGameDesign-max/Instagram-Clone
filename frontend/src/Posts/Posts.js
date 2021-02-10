import React, { useState } from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'

function Posts({post__img, username, caption, avatar__alt}) {

    return (
        <div className="posts">
            <div className="post__avatar__title">
                
                <Avatar className="post__avatar" alt={avatar__alt} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            
            <img className="post__img" alt="" src={process.env.PUBLIC_URL + post__img} />
            
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}


export default Posts
