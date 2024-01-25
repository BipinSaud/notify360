import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

import { useEffect, useState } from "react";
import { auth } from "./firebase";

import "./App.css";
import Profile from "./components/Profile/Profile";

export default function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
      console.log(user);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home name={userName} />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
