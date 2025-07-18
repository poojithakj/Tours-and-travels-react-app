import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import "./Success.css"; // Import CSS for styling
const successAnimation = require("../payment/pic.json");

const Success = () => {
  const navigate = useNavigate();
  const handleOkClick = () => {
    alert("Booking details stored successfully!"); 
    navigate("/dashboard"); // Redirect to dashboard or bookings page
  };


  useEffect(() => {
    // Retrieve existing bookings
    let storedBookings = localStorage.getItem("bookings");
    let bookingsArray = storedBookings ? JSON.parse(storedBookings) : [];

    // Mark the latest booking as "Paid"
    if (bookingsArray.length > 0) {
      bookingsArray[bookingsArray.length - 1].paymentStatus = "Paid"; 
      localStorage.setItem("bookings", JSON.stringify(bookingsArray));
    }
  }, []);

  return (
    <div className="success-container">
      <div className="success-box">
        {/* Lottie Animation */}
        <div className="success-animation">
          <Lottie animationData={successAnimation} loop={true} />
        </div>

        <h2>Payment Successful</h2>
        <button className="success-btn" onClick={handleOkClick}>OK</button>
        
      </div>
    </div>
  );
};

export default Success;
