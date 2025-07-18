import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Dashboard.css";
import { Link } from "react-router-dom";

const locations = [
  { name: "Bangalore", img: "banglore.png" },
  { name: "Chennai", img: "chennai.png" },
  { name: "Bangkok", img: "bangkok.png" },
  { name: "Australia", img: "australia.png" },
  { name: "Italy", img: "italy.png" },
  { name: "Amsterdam", img: "amsterdam.png" },
];

const feedbacks = [
  { user: "Renuka", text: "Great experience!" },
  { user: "V_kas", text: "Loved the service!" },
  { user: "Noah", text: "Excellent!" },
];

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/"); // Redirect to login page
  };

  // Function to handle selecting a location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  // Function to handle booking
  const handleBookNow = (packageType, price) => {
    if (!selectedLocation) {
      alert("Please select a location first!");
      return;
    }
  
    // Create booking object with correct package name and price
    const booking = {
      location: selectedLocation.name,
      package: packageType,  // Store the package type (Standard, Gold, Platinum)
      price: price, // Store correct price dynamically
      date: new Date().toLocaleString(),
    };
  
    // Retrieve existing bookings from localStorage or initialize an empty array
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
    // Add new booking to the array
    existingBookings.push(booking);
  
    // Save updated bookings back to localStorage
    localStorage.setItem("bookings", JSON.stringify(existingBookings));
  
    // Redirect to Payment page
    navigate("/payment");
  };
  const handleMyBookings = () => {
    navigate("/mybookings");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">UTOSIA</div>

        {/* User Profile with Tooltip & Dropdown */}
        <div
          className="user-profile"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <div className="user-icon">👤</div>

          {/* Tooltip */}
          {isTooltipVisible && <span className="tooltip">Profile</span>}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleMyBookings}>My Bookings</li> {/* Navigate to MyBookings */}
                <Link to="/profile">Profile</Link>
                <li onClick={handleLogout} style={{ color: "yellow", cursor: "pointer" }}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Choose Location Section */}
      <section className="choose-location">
        <h2>Choose Location</h2>
        <div className="location-scroll">
          {locations.map((loc, index) => (
            <div
              key={index}
              className={`location-card ${selectedLocation?.name === loc.name ? "selected" : ""}`}
              onClick={() => handleSelectLocation(loc)}
            >
              <img src={`/${loc.img}`} alt={loc.name} />
              <div className="location-name">{loc.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages">
        <h2>Packages</h2>

        {/* Standard Package */}
        <div className="package-container">
          <div className="package-card">
            <h3>Standard Pack</h3>
            <p className="price">₹ 4,500 /-</p>
            <button className="book-btn" onClick={() => handleBookNow("Standard Pack", "₹ 4,500")}>
              Book Now
            </button>
          </div>

          <div className="details">
            <h3>Includes</h3>
            <ul>
              <li>Night Meals</li>
              <li>Bedsheets and Pillows</li>
              <li>Non AC</li>
            </ul>
          </div>

          <div className="feedback">
            <h3>Feedback</h3>
            {feedbacks.map((fb, index) => (
              <div className="feedback-card" key={index}>
                <strong>{fb.user}</strong>
                <p>{fb.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Package */}
        <div className="package-container">
          <div className="package-card">
            <h3>Gold Pack</h3>
            <p className="price">₹ 8,500 /-</p>

            <button className="book-btn" onClick={() => handleBookNow("Gold Pack", "₹ 8,500")}>
              Book Now
            </button>
          </div>

          <div className="details">
            <h3>Includes</h3>
            <ul>
              <li>Night Meals</li>
              <li>Bedsheets and Pillows</li>
              <li>Non AC</li>
            </ul>
          </div>

          <div className="feedback">
            <h3>Feedback</h3>
            {feedbacks.map((fb, index) => (
              <div className="feedback-card" key={index}>
                <strong>{fb.user}</strong>
                <p>{fb.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platinum Package */}
        <div className="package-container">
          <div className="package-card">
            <h3>Platinum Pack</h3>
            <p className="price">₹ 15,000 /-</p>
            <button className="book-btn" onClick={() => handleBookNow("Platinum Pack", "₹ 15,000")}>
              Book Now
            </button>
          </div>

          <div className="details">
            <h3>Includes</h3>
            <ul>
              <li>Night Meals</li>
              <li>Bedsheets and Pillows</li>
              <li>Non AC</li>
            </ul>
          </div>

          <div className="feedback">
            <h3>Feedback</h3>
            {feedbacks.map((fb, index) => (
              <div className="feedback-card" key={index}>
                <strong>{fb.user}</strong>
                <p>{fb.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
