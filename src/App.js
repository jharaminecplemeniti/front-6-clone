import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Works from './pages/Works';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Vježbe
import Recipes from "./components/vjezbe/Recipes";
import Posts from "./components/vjezbe/Posts";


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/Posts" element={<Posts />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
