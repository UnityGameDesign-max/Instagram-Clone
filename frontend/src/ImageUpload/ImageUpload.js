import React, { useState } from 'react'
import {Button} from '@material-ui/core'
import { storage, db } from '../Firebase/firebase'
import './ImageUpload.css'


function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState(' ');

    const handleChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) =>{
            
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                
                );
          
                setProgress(progress);
            },
            (err) =>{
                console.log(err);
                alert(err.message);
            },

            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            // timestamp: firebase.fireatore.FindValue.serverTimestamp(),
                            captions: caption,
                            post__img: url,
                            username: username,
                            avatar__alt: username
                        });

                        setProgress(0);
                        setCaption(" ");
                        setImage(null);
                    })
            }
        ) 

    }

    return (
        <div className="image_upload">
            <progress className="image_upload_progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button className="imageupload__button" onClick={handleUpload}>
                Upload
            </Button>
 
            
        </div>
    )
}

export default ImageUpload
