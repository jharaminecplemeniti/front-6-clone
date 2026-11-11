
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import CategoryDropdown from "./CategoryDropdown";
import TagDropdown from "./TagDropdown";
import RecipeCard from "./RecipeCard";

import "./Recepti.css";

const API_URL =
    "https://front6.edukacija.online/backend/wp-json/wp/v2";

function Recipes() {

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("vrsta-jela") || "";

    // DOHVAĆANJE KATEGORIJA I OZNAKA

    useEffect(() => {

        fetch(`${API_URL}/vrsta-jela?_fields=id,name,parent&per_page=100`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));

        fetch(`${API_URL}/tags?_fields=id,name&per_page=100`)
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(err => console.error(err));

    }, []);

    // DOHVAĆANJE RECEPATA

    useEffect(() => {

        const params = new URLSearchParams();

        if (selectedCategory) {
            params.set("vrsta-jela", selectedCategory);
        }

        if (selectedTag) {
            params.set("tags", selectedTag);
        }

        fetch(`${API_URL}/recipes?${params.toString()}&_embed=1`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Greška kod dohvaćanja recepata.");
                }

                return res.json();
            })
            .then(data => setPosts(data))
            .catch(err => console.error(err));

    }, [selectedCategory, selectedTag]);

    // PROMJENA KATEGORIJE

    const handleCategoryChange = (value) => {

        setSearchParams(params => {

            const newParams = new URLSearchParams(params);

            if (value) {
                newParams.set("vrsta-jela", value);
            } else {
                newParams.delete("vrsta-jela");
            }

            return newParams;
        });
    };

    return (
        <main className="container">

            <h1 className="display-4 text-center py-5">
                Naši recepti
            </h1>

            {/* FILTERI */}

            <div className="row mb-4">

                <div className="col-md-4 mb-3">
                    <CategoryDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <TagDropdown
                        tags={tags}
                        selectedTag={selectedTag}
                        onTagChange={setSelectedTag}
                    />
                </div>

            </div>

            {/* RECEPTI */}

            <div className="row">

                {posts.length > 0 ? (

                    posts.map(post => (
                        <RecipeCard
                            key={post.id}
                            post={post}
                        />
                    ))

                ) : (

                    <div className="col-12">
                        <p className="text-center py-5">
                            Nema pronađenih recepata za odabrane filtere.
                        </p>
                    </div>

                )}

            </div>

        </main>
    );
}

export default Recipes;
