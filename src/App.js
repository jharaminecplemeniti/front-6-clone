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
import BlogSingle from './pages/BlogSingle';
import Contact from './pages/Contact';
import Page from './pages/Page';

// Vježbe
import Posts from "./components/vjezbe/Posts";
import Users from './components/vjezbe/Users';

// Recepti

import Recepti from './pages/Recepti';
import ReceptiSingle from './pages/ReceptiSingle';


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/blog/:slug' element={<BlogSingle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Users" element={<Users />} />
        <Route path='/recipes' element={<Recepti />} />
        <Route path='/recipes/:slug' element={<ReceptiSingle />} />
        
        <Route path="/privatnost" element={<Page pageID="557" />} />
        <Route path="/kolacici" element={<Page pageID="560" />} />
        <Route path="/o_nama" element={<Page pageID="576" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
