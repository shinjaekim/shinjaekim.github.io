import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tags from "./pages/Tags";
import Review from "./pages/Review";
import "./styles/style.css";  // 스타일 파일

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <header>
        <h1>My Dev Blog</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/tags">Tags</Link>
          <Link to="/review">Posts to Review</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 My Dev Blog. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
