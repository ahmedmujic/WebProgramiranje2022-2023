import './App.css';
import Nav from './layout/Nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './helpers/AuthContext'

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: '',
    isLoggedIn: false
  })

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");

    axios.get('http://localhost:3001/api/auth/user', {
      headers: {
        'access-token': `Bearer ${accessToken}`
      }
    }).then(response => {
      let user = response.data
      setAuthState({
        id: user.id,
        username: user.username,
        isLoggedIn: true
      })
    }).catch(error => {
      return <Home />
    })
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>

      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
