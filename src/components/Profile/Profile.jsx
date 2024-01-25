// Profile.js
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      navigate("/"); // Navigate to the home page after successful logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="profile-sidebar">
      {user ? (
        <>
          <div className="profile-info">
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <p>Email: {user.email}</p>
            {user.displayName && <p>Name: {user.displayName}</p>}
          </div>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <div className="login-message">
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
