import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="recipe-footer">
      <div className="recipe-footer-container">
        <div className="recipe-footer-main">
          <Link className="recipe-footer-brand" to="/">
            <span className="recipe-footer-brand-mark">Ž</span>

            <span className="recipe-footer-brand-name">
              žlica <span>&</span> začin
              <small>RECEPTI ZA SVAKI DAN</small>
            </span>
          </Link>

          <p className="recipe-footer-description">
            Malo inspiracije, prstohvat začina i puno ljubavi na svakom tanjuru.
          </p>

          <div className="recipe-footer-socials" aria-label="Društvene mreže">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <Twitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        <div className="recipe-footer-bottom">
          <div className="recipe-footer-links">
            <Link to="/privatnost">Pravila privatnosti</Link>
            <Link to="/kolacici">Kolačići</Link>
          </div>

          <p>
            © {new Date().getFullYear()} Žlica & začin. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;