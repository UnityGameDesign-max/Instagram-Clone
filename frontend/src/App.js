import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './Header/Header'
import Posts from './Posts/Posts'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'
// import { db } from './Firebase/firebase'
// import { auth } from './Firebase/firebase'


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
  const [posts, setPosts] = useState([

    {
      username: "Tumelo",
      captions: "what a wonderful day!",
      avatar__alt: "Tumelo",
      post__img: "trends.jpg"
    },

    {
      username: "Katleho",
      captions: "When we still young!",
      avatar__alt: "Katleho",
      post__img: "fancy_cat.jpg"
    },


    {
      username: "Cars.com",
      captions: "most powerful and beautiful!",
      avatar__alt: "Cars.com",
      post__img: "ford_mustang.jpg"
    }

    
  ]);


  // useEffect(() => {
  //   // auth.onAuthStateChange((authUser) =>({
  //   //   if (authUser){
  //   //     console.log(authUser);
  //   //     setUser(authUser);


  //   //     if (authUser.displayName){

  //   //     }else{
  //   //       return authUser.updateProfile({
  //   //         displayName: username,
  //   //       });
  //   //     }
  //   //   } else {
  //   //     setUser(null);
  //   //   }
  //   // })
  // }, [user, username]);

  const [open, setOpen] = useState(false);
  // useEffect(() => {
    
  //   db.collection('posts').onSnapshot(snapshot => {
  //     setPosts(snapshop.docs.map(doc => ({
  //       id: doc.id,
  //       post: doc.data()

  //     })))
  //   })

  // }, []);

  const signUp = (event) => {
    event.preventDefault();

    // auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
    //   autheUser.user.updateProfile({
    //     displayName: username
    //   })
    // })


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
                
                <Button type="submit" onClick={signUp}>Login</Button>
              
            </form>
          </center>
        </div>
      </Modal>
      
      <Header />

      
      <Button onClick={() => setOpen(true)}>Sign up</Button>
      
      
      {
        posts.map(post =>(
          <Posts username={post.username} avatar__alt={post.avatar__alt} caption={post.captions} post__img={post.post__img}/>
        ))
      }
      
    </div>
  );
}

export default App;
