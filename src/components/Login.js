import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate to redirect

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve registered users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const userExists = users.find((user) => user.email === email && user.password === password);

    if (!userExists) {
      setError("No user found. Please register first.");
    } else {
      setError(""); // Clear error message
      localStorage.setItem("user", JSON.stringify(userExists)); // Store logged-in user
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to Dashboard after login
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="image1.png" alt="Travel Illustration" width="400px"  />
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {error && <p className="error-message">{error}</p>} {/* Show error if exists */}
          <button type="submit">LOGIN</button>
        </form>
        <p>
          Don't have an Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
