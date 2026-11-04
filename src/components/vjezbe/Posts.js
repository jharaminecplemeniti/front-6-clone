import React, { useEffect, useState } from 'react'

function Posts() {

    const[posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/posts")
        .then(res => res.json())
        .then(data => setPosts(data.posts))
    }, [])

    console.log(posts)

  return (
    <div className="container">
    <h2> Posts </h2>
    {
        posts.map(posts => {
            return (
                <div>
                    <h2>{posts.title}</h2>
                    <p>{posts.body}</p>
                    <p>{posts.tags}</p>
                    <p>{posts.reactions.likes}</p>
                    <p>{posts.reactions.dislikes}</p>
                    <p>{posts.views}</p>
                </div>
            )
        })
    }
    </div>
  )
}

export default Posts