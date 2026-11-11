import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

const API_URL =
  "https://front6.edukacija.online/backend/wp-json/wp/v2";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipeSubmenuOpen, setRecipeSubmenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setRecipeSubmenuOpen(false);
};

  useEffect(() => {
    fetch(`${API_URL}/vrsta-jela?per_page=100`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Greška kod dohvaćanja kategorija.");
        }
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

const mainCategories = categories.filter(
  (category) => Number(category.parent) === 0
);

const getSubcategories = (parentID) => {
  return categories.filter(
    (category) => Number(category.parent) === Number(parentID)
  );
  };

  return (
    <header className="recipe-header">
      <nav className="recipe-navbar">
        <div className="recipe-nav-container">

          <Link className="recipe-brand" to="/" onClick={closeMenu}>
            <span className="recipe-brand-mark">Ž</span>

            <span className="recipe-brand-name">
              žlica <span>&</span> začin
              <small>RECEPTI ZA SVAKI DAN</small>
            </span>
          </Link>

          <button
            className={`recipe-menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
            aria-expanded={menuOpen}
            aria-controls="recipe-nav-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            id="recipe-nav-menu"
            className={`recipe-nav-menu ${menuOpen ? "is-open" : ""}`}
          >

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `recipe-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Početna
            </NavLink>

            {/* RECEPTI - PADAJUĆI IZBORNIK */}
            <div className={`recipe-dropdown ${recipeSubmenuOpen ? "submenu-open" : ""}`}>

                <NavLink
                    to="/recipes"
                    className={({ isActive }) =>
                        `recipe-nav-link recipe-dropdown-trigger ${
                            isActive ? "active" : ""
                        }`
                    }
                    onClick={(event) => {

                        const isMobile = window.matchMedia("(max-width: 760px)").matches;

                        if (isMobile && !recipeSubmenuOpen) {
                            event.preventDefault();
                            setRecipeSubmenuOpen(true);
                        } else {
                            closeMenu();
                        }
                    }}
                    aria-expanded={recipeSubmenuOpen}
                >
                    Recepti <span className="dropdown-arrow">⌄</span>
                </NavLink>

              <div className="recipe-dropdown-menu">

                {mainCategories.map((category) => {
                  const subcategories = getSubcategories(category.id);

                  return (
                    <div className="recipe-dropdown-group" key={category.id}>

                      <Link
                        to={`/recipes?vrsta-jela=${category.id}`}
                        className="recipe-dropdown-main"
                        onClick={closeMenu}
                        dangerouslySetInnerHTML={{
                          __html: category.name,
                        }}
                      />

                      {subcategories.length > 0 && (
                        <div className="recipe-dropdown-subcategories">
                          {subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              to={`/recipes?vrsta-jela=${subcategory.id}`}
                              onClick={closeMenu}
                              dangerouslySetInnerHTML={{
                                __html: subcategory.name,
                              }}
                            />
                          ))}
                        </div>
                      )}

                    </div>
                  );
                })}

                <div className="recipe-dropdown-divider"></div>

                <Link
                  to="/recipes"
                  className="recipe-dropdown-all"
                  onClick={closeMenu}
                >
                  Pogledaj sve recepte →
                </Link>

              </div>
            </div>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `recipe-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Blog
            </NavLink>

            <NavLink
                to="/o_nama"
                className={({ isActive }) =>
                  `recipe-nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeMenu}
              >
                O nama
            </NavLink>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
