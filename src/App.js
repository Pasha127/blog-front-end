import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/log-in/logIn";
import SplashNavBar from "./components/navbar/SplashNavbar";

function App() {
 
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

const logOut = async () =>{
  try{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/authors/logout`
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        setLoggedIn(false);
        setCurrentUser({});            
          } else {
            console.log("error logging out")
          }
        }catch(error){
          console.log(error)
        }
}

const getMe = async () =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/authors/me`
      /* console.log("fetch blogs") */
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        const data = await response.json()
        setLoggedIn(true);
        setCurrentUser(data);            
          } else {
            const options2 = {
              method: 'POST' ,
              credentials:"include",
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',         
                } 
              };      
              const baseEndpoint2 = `${baseURL}/authors/refreshTokens`
              const response2 = await fetch(baseEndpoint2, options2);
              if (response2.ok) {
                const data2 = await response2.json()
                setLoggedIn(true);
                getMe()            
                  } else {
                    console.log("Error fetching me");
                    setLoggedIn(false);
            }
            
    }
}


useEffect(()=>{
  getMe()
},[])


  return (
    <Router>
      {loggedIn?<NavBar currentUser={currentUser} logOut={logOut}  setLoggedIn={setLoggedIn}/>:<SplashNavBar />}
      <Routes>
        <Route path="/" exact element={!loggedIn? <LogIn  setLoggedIn={setLoggedIn}  />: <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
{/*         <Route path="/home" exact element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} /> */}
        <Route path="/blog/:id" element={!loggedIn? <LogIn    setLoggedIn={setLoggedIn}/>:<Blog currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/new" element={!loggedIn? <LogIn setLoggedIn={setLoggedIn} />:<NewBlogPost currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
      {loggedIn && <Footer />}
    </Router>
  );
}

export default App;
