import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `recipe-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Recepti
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `recipe-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Blog
            </NavLink>

            <Link
              to="/recipes"
              className="recipe-nav-cta"
              onClick={closeMenu}
            >
              Pronađi recept <span>↗</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


/*
    1. Umjesto className koristiti classNameName
    2. Samozatvarajući tagovi (img, br, hr, input) moraju završiti sa / 
        npr. <img src="..." />
    3. Više elementa u return-u moraju biti obavijeni u jedan parent element 
        (div, section, fragment)

*/