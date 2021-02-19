import React, { useState, useEffect } from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
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
            
            <img className="post__img" alt="" src={post__img} />

            <div className="post__icons">
                <div className="post_icons_left">
                    <IconButton>
                        <FavoriteBorderIcon fill={red} className="post_like_button" />
                    </IconButton>

                    <IconButton>
                        <ChatBubbleOutlineOutlinedIcon className="post_chats_button" />
                    </IconButton>
                </div>

                <div className="post_icons_right">
                    <IconButton>
                        <BookmarkBorderIcon className="post_save_bookmarks"/>
                    </IconButton>
                </div>
                

            </div>
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
            
                <SentimentSatisfiedOutlinedIcon className="post__smileyface" />
            
                

                <button className="post_button" disabled={!comment} type="submit" onClick={postComment}>
                    Post
                
                </button>
            </form>
        </div>

    )
}


export default Posts
