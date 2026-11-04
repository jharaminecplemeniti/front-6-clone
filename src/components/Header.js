import { Link } from 'react-router-dom';

function Header() {


    return (
        <nav className="navbar navbar-expand-md">
        <div className="container">
          <Link className="navbar-brand" to="/">LOGO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/kafici">Kafići</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/restorani">Restorani</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Header;


/*
    1. Umjesto className koristiti classNameName
    2. Samozatvarajući tagovi (img, br, hr, input) moraju završiti sa / 
        npr. <img src="..." />
    3. Više elementa u return-u moraju biti obavijeni u jedan parent element 
        (div, section, fragment)

*/