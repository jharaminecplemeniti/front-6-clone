import BlogBox from "../components/BlogBox";
import Work from "../components/Work";
import Heading3 from "../components/Heading3";
import Products from "../components/vjezbe/Products";

function Home(){

    return (
        <>
        <div class="hero">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Hi, I am John, Creative Technologist</h1>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              <a href="/">Download Resume</a>
            </div>
            <div class="col-md-5">
              <img alt="Opis slike" src="https://placehold.co/200x200" />
            </div>
          </div>
        </div>
      </div>

      <Products />


      <div class="recent-post">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <Heading3 title="Recent posts" />
            </div>
            <div class="col-md-6 text-end">
              <a href="/">View all</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <BlogBox />
            </div>
            <div class="col-md-6">
              <BlogBox />
            </div>
          </div>
        </div>
      </div>

      <div class="featured-works">
          <div class="container">
            <Heading3 title="Featured works" />
            <Work title="Project 1" />
            <Work title="Project 2" />
            <Work title="Project 3" />       
          </div>
      </div>
      </>
    )
}

export default Home;