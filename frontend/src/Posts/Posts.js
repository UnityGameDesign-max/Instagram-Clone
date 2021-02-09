import React from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'

function Posts() {
    return (
        <div className="posts">
            <div className="post__avatar__title">
                
                <Avatar className="post__avatar" alt="Tumi" src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
            </div>
            
            <img className="post__img" alt="" src={process.env.PUBLIC_URL + "trends.jpg"} />
            
            <h4 className="post__text"><strong>Tumelo</strong> These are exciting style trends!</h4>
        </div>
    )
}


export default Posts
