import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    if (users.some((user) => user.email === email)) {
      alert("Email already registered. Please log in.");
      return;
    }

    // Add new user
    const newUser = { name, email, mobile, address, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="image1.png" alt="Travel Illustration" />
      </div>
      <div className="right-section">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an Account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
