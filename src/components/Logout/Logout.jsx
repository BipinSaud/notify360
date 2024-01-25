// Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);

      // Perform any additional actions after logout if needed
      navigate("./");
      console.log("User has been successfully signed out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
