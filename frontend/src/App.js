import React, { useState } from 'react'
import './App.css';
import Header from './Header/Header'
import Posts from './Posts/Posts'

function App() {
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


  return (
    <div className="App">
      <Header />
      {
        posts.map(post =>(
          <Posts username={post.username} avatar__alt={post.avatar__alt} caption={post.captions} post__img={post.post__img}/>
        ))
      }
      
    </div>
  );
}

export default App;
