import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/log-in/logIn";
import SplashNavBar from "./components/navbar/SplashNavbar";

function App() {
  return (
    <Router>
      <SplashNavBar />
      <Routes>
        <Route path="/" exact element={<LogIn />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
