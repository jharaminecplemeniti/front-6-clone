import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const API_URL =
  "https://front6.edukacija.online/backend/wp-json/wp/v2";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/recipes?per_page=3&_embed=1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greška prilikom dohvaćanja recepata.");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const getRecipeImage = (recipe) => {
    return (
      recipe._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
    );
  };

  const getRecipeExcerpt = (recipe) => {
    const excerpt = recipe.excerpt?.rendered || "";
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = excerpt;

    return temporaryElement.textContent || temporaryElement.innerText || "";
  };

  return (
    <main className="home-page">

      {/* HERO SEKCIJA */}
      <section className="home-container">
        <div className="home-hero">

          <div className="home-hero-copy">
            <p className="home-eyebrow">
              Dobro došli u našu kuhinju
            </p>

            <h1>
              Svaki dobar dan počinje <span>dobrim receptom.</span>
            </h1>

            <p className="home-hero-description">
              Otkrijte inspiraciju za svakodnevno kuhanje,
              isprobajte nove okuse i pronađite recepte koji
              će okupiti vaše najdraže oko stola.
            </p>

            <div className="home-hero-actions">
              <Link to="/recipes" className="home-button">
                Pronađi recept <span>→</span>
              </Link>

              <Link to="/blog" className="home-button home-button-secondary">
                Pročitaj blog
              </Link>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-hero-image-frame">
              <div className="home-hero-image-placeholder">
                Dobrodošli za naš stol
              </div>
            </div>

            <div className="home-hero-note">
              Kuhano s ljubavlju.
              <small>Posluženo s osmijehom</small>
            </div>
          </div>

        </div>
      </section>

      {/* UVODNA SEKCIJA */}
      <section className="home-container home-intro">

        <div className="home-section-heading">
          <p>Naša filozofija</p>
          <h2>Više od običnog recepta</h2>
          <span>
            Vjerujemo da najbolji trenuci nastaju upravo u kuhinji.
            Zato smo ovdje da vam pomognemo pronaći inspiraciju za svaki dan.
          </span>
        </div>

        <div className="home-feature-grid">

          <article className="home-feature-card">
            <div className="home-feature-icon">🍲</div>
            <h3>Isprobani recepti</h3>
            <p>
              Pronađite ideje za ukusna jela koja možete pripremiti
              kod kuće, bez obzira na svoje kulinarsko iskustvo.
            </p>
          </article>

          <article className="home-feature-card">
            <div className="home-feature-icon">🌿</div>
            <h3>Svježa inspiracija</h3>
            <p>
              Otkrijte nove kombinacije sastojaka, zanimljive okuse
              i ideje koje će obogatiti vaš svakodnevni jelovnik.
            </p>
          </article>

          <article className="home-feature-card">
            <div className="home-feature-icon">❤️</div>
            <h3>Kuhanje s ljubavlju</h3>
            <p>
              Jer hrana nije samo ono što stavljamo na tanjur,
              već i način na koji stvaramo lijepe zajedničke trenutke.
            </p>
          </article>

        </div>
      </section>

      {/* NAJNOVIJI RECEPTI */}
      <section className="home-latest">

        <div className="home-container">

          <div className="home-latest-header">
            <div className="home-section-heading">
              <p>Iz naše kuhinje</p>
              <h2>Najnoviji recepti</h2>
            </div>

            <Link to="/recipes" className="home-text-link">
              Svi recepti →
            </Link>
          </div>

          <div className="home-recipe-grid">

            {loading ? (
              <p className="home-loading">
                Učitavanje recepata...
              </p>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <article className="home-recipe-card" key={recipe.id}>

                  <div className="home-recipe-card-image">
                    {getRecipeImage(recipe) ? (
                      <img
                        src={getRecipeImage(recipe)}
                        alt={recipe.title.rendered}
                      />
                    ) : (
                      <span>🍽️</span>
                    )}
                  </div>

                  <div className="home-recipe-card-content">
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: recipe.title.rendered,
                      }}
                    />

                    <p>{getRecipeExcerpt(recipe)}</p>

                    <Link to={`/recipes/${recipe.slug}`}>
                      Pročitaj recept →
                    </Link>
                  </div>

                </article>
              ))
            ) : (
              <p className="home-empty">
                Trenutno nema dostupnih recepata.
              </p>
            )}

          </div>
        </div>
      </section>

      {/* ZAVRŠNA SEKCIJA */}
      <section className="home-container home-cta">

        <div className="home-cta-panel">
          <div>
            <p>Vrijeme je za kuhanje!</p>
            <h2>Pronađite nešto ukusno za svoj sljedeći obrok.</h2>
          </div>

          <Link to="/recipes" className="home-button">
            Istraži recepte →
          </Link>
        </div>

      </section>

    </main>
  );
}

export default Home;