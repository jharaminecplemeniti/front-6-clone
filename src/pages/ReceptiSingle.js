import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipesSingle() {

    const { slug } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/recipes?slug=" + slug + "&_fields=slug,content,title,acf")
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    if(!post) return <p>Učitavanje...</p>

    return (
        <div className="container">
            <h1>{post.title.rendered}</h1>
            {post.acf.prep_time !== null && post.acf.prep_time !== "" && !Number.isNaN(Number(post.acf.prep_time)) ? (
                <p>Vrijeme pripreme: {post.acf.prep_time}</p>
            ) : (
                <p>Priprema dan ranije!</p>
            )}
            <p>Vrijeme kuhanja/pečenja: {post.acf.cook_time}</p>
            <p>Broj porcija: {post.acf.servings}</p>
        

            
            

            <div className="row">
                <div className="col-md-8 m-auto" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            </div>
        </div>
    );
}

export default RecipesSingle;