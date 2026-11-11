
import { Link } from "react-router-dom";

function RecipeCard({ post }) {

    const featuredImage =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    return (
        <div className="col-md-4 mb-4">

            <div
                className="recipe-card"
                style={{
                    backgroundImage: featuredImage
                        ? `url("${featuredImage}")`
                        : "none"
                }}
            >

                <div className="recipe-card-overlay">

                    <h2
                        dangerouslySetInnerHTML={{
                            __html: post.title.rendered
                        }}
                    />

                    <Link to={`/recipes/${post.slug}`}>
                        Pogledaj recept →
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default RecipeCard;
