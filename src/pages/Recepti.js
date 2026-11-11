import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recepti.css";

function Recipes() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

useEffect(() => {
    fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/vrsta-jela?_fields=id,name&per_page=100")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error(err));

    fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/tags?_fields=id,name&per_page=100")
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(err => console.error(err));
}, []);

useEffect(() => {
    let url = "https://front6.edukacija.online/backend/wp-json/wp/v2/recipes?";

    if (selectedCategory) {
        url += "vrsta-jela=" + selectedCategory + "&";
    }

    if (selectedTag) {
        url += "tags=" + selectedTag;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.error(err));

}, [selectedCategory, selectedTag]);

    return (
        <div className="container">

            <h1 className="display-4 text-center py-5">
                Naši recepti
            </h1>

            <div className="row">

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)} >
                        <option value="">Sve kategorije</option>

                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedTag}
                        onChange={e => setSelectedTag(e.target.value)}>
                        <option value="">Sve oznake</option>

                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}

                    </select>
                </div>

            </div>

            <div className="row">

                {posts.map(post => (
                    <div className="col-md-4" key={post.id}>

                        <h2
                            dangerouslySetInnerHTML={{
                                __html: post.title.rendered
                            }}
                        />

                        <Link to={"/recipes/" + post.slug}>
                            Pogledaj recept
                        </Link>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Recipes;