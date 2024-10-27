// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tags from "./pages/Tags";
import Review from "./pages/Review";
import "./styles/style.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-container">
        {/* 좌측 사이드 메뉴 */}
        <aside className="sidebar">
          <h2>'제목 미정'</h2>
          <nav>
            <h3>Frontend</h3>
            <ul>
              <li><Link to="/frontend/html-css">HTML/CSS</Link></li>
              <li><Link to="/frontend/javascript">JavaScript</Link></li>
              <li><Link to="/frontend/react">React</Link></li>
            </ul>
            
            <h3>Backend</h3>
            <ul>
              <li><Link to="/backend/nodejs">Node.js</Link></li>
              <li><Link to="/backend/spring">Spring</Link></li>
            </ul>

            <h3>형상 관리</h3>
            <ul>
              <li><Link to="/version-control/git">Git</Link></li>
              <li><Link to="/version-control/github">GitHub</Link></li>
            </ul>

            <h3>DevOps</h3>
            <ul>
              <li><Link to="/devops/ci-cd">CI/CD</Link></li>
              <li><Link to="/devops/docker">Docker</Link></li>
              <li><Link to="/devops/kubernetes">Kubernetes</Link></li>
            </ul>

            <h3>프로그래밍 기초</h3>
            <ul>
              <li><Link to="/fundamentals/data-structures">데이터 구조</Link></li>
              <li><Link to="/fundamentals/algorithms">알고리즘</Link></li>
              <li><Link to="/fundamentals/design-patterns">디자인 패턴</Link></li>
            </ul>

            <h3>Computer Science</h3>
            <ul>
              <li><Link to="/cs/networks">네트워크</Link></li>
              <li><Link to="/cs/os">운영체제</Link></li>
              <li><Link to="/cs/databases">데이터베이스</Link></li>
            </ul>
          </nav>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/review" element={<Review />} />
            {/* 추가적인 경로 설정 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
