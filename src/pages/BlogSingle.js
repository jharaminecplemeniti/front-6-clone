import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogSingle.css";

function BlogSingle(){

    const{slug} = useParams();
    const [post, setPost] = useState();
   
    useEffect(()=> {
            fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/posts?slug=" + slug)
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
}, [slug]);

    console.log(post);


    if (!post) return <p>Učitavanje...</p>

    return (
        <div className="container">
            <h1>{post.title.rendered}</h1>
            <div className="row">
                <div className="col-md-8 m-auto" dangerouslySetInnerHTML={{ __html: post.content.rendered}}></div>
            </div>
        </div>
    );
}

export default BlogSingle;