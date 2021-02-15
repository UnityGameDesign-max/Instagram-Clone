import React, { useState, useEffect } from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from '../Firebase/firebase'

function Posts({ postId, user,post__img, username, caption, avatar__alt}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(' ')


    const postComment = (e)=>{

        e.preventDefault();

        db.collection('posts').doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName
        });

        setComment(' ');

    }


    useEffect(() =>{

        let unsubscribe;
        if(postId){
            unsubscribe = db
             .collection("posts")
             .doc(postId)
             .collection("comments")
             .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
             });
        }

        return() =>{
            unsubscribe();
        }
    }, [postId]);

    return (
        <div className="posts">
            <div className="post__avatar__title">
                
                <Avatar className="post__avatar" alt={avatar__alt} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            
            <img className="post__img" alt="" src={process.env.PUBLIC_URL + post__img} />
            
            
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post_comment">
                {comments.map((comment) => {
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    
                    </p>
                })}
            
            </div>

            <form className="post_commentBox">
                <input className="post_input" type="text"
                    placeholder="comment..." value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                />

                <button className="post_button" disabled={!comment} type="submit" onClick={postComment}>
                    Post
                
                </button>
            </form>
        </div>

    )
}


export default Posts
