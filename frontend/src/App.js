import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './Header/Header'
import Posts from './Posts/Posts'
import Modal from '@material-ui/core/Modal'
import Avatar from '@material-ui/core/Avatar'
import Profile from './Profile/Profile'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'
import { db } from './Firebase/firebase'
import { auth } from './Firebase/firebase'
import ImageUpload from './ImageUpload/ImageUpload'



function getModalStyle(){

  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${top}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) =>({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}))



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [open, setOpen] = useState(false);


  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        console.log(authUser);
        setUser(authUser);
      

      
        if (authUser.displayName){
          // dont update username
        }
        else{
          return authUser.updateProfile({
            displayName:username
          });
        }

      }else{
        setUser(null);
      }

    })

    return () => {
      unsubscribe();
      
    }
    
  }, [user, username]);


  useEffect(() => {
    
    db.collection("posts").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()

      })));
    })

  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user.updateProfile({
        displayName: username
      })
    })
      .catch((err) => alert(err.message))
      setOpen(false);

  }


  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err.message))  
    
    setOpen(true);

  }


  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">  
              <img className="header__logo" alt="" src={process.env.PUBLIC_URL + "/1200px-Instagram_logo.svg.png"} />
              <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>   
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>   
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
               
              <Button type="submit" onClick={signUp}>Sign Up</Button>
              
            </form>
          </center>
        </div>
      </Modal>


      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">  
              <img className="header__logo" alt="" src={process.env.PUBLIC_URL + "/1200px-Instagram_logo.svg.png"} />   
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>   
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              
              <Button type="submit" onClick={signIn}>Sign In</Button>
              
            </form>
          </center>
        </div>
      </Modal>
       
      <Header user={user} setOpenSignIn={setOpenSignIn} setOpen={setOpen} />

      

      <div className="posts__profile">
      
        <div className="app_posts">
          {
            posts.map(({id , post}) =>(
              <Posts key={id} postId={id} user={user} username={post.username} avatar__alt={post.avatar__alt} caption={post.captions} post__img={post.post__img}/>
            ))
          }

        </div>
        

        <div className="app_profile">
          {!user ? "Haven't logged In" : (<Avatar />) }
          <div className="profile__info">  
            <h4 className="suggestion__text">Suggestions For You</h4>
            <h5>See All</h5>
          </div>

          <Profile user={user} />  
          
        </div>

      </div>

      
     
    </div>
  );


}

export default App;
