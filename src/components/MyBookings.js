import React, { useEffect, useState } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingIndex, setSelectedBookingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
    setBookings(existingBookings);
    setHistory(existingHistory);
  }, []);

  const handleCancelClick = (index) => {
    setSelectedBookingIndex(index);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBookingIndex !== null) {
      const canceledBooking = bookings[selectedBookingIndex];

      // Update Bookings & History
      const updatedBookings = bookings.filter((_, i) => i !== selectedBookingIndex);
      const updatedHistory = [...history, canceledBooking];

      // Save to localStorage
      setBookings(updatedBookings);
      setHistory(updatedHistory);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      localStorage.setItem("history", JSON.stringify(updatedHistory));

      // Close Modal
      setShowModal(false);
      setSelectedBookingIndex(null);
    }
  };

  const handleLogout = () => {
   
    alert("Logged out successfully!");
    // Redirect to login page if applicable
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">UTOSIA</div>
        <div className="user-container">
          <div className="user-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>👤</div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* My Bookings Section */}
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <p className="package-title">standard pack</p>
              <p className="price">{booking.price} /-</p>
              <p className="date">{booking.date}</p>
              <button onClick={() => handleCancelClick(index)}>Cancel</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No active bookings found.</p>
      )}

      {/* History Section */}
      <h2>History</h2>
      {history.length > 0 ? (
        <div className="history-list">
          {history.map((booking, index) => (
            <div key={index} className="booking-card history">
              <p className="package-title">standard pack</p>
              <p className="price">{booking.price} /-</p>
              <p className="date">{booking.date}</p>
              <p className="canceled-text">Canceled</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No canceled bookings found.</p>
      )}

      {/* Payment Policy Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Payment Policy</h3>
            <p>
            Booking canceled. Please refer to our payment policy for refunds.
            </p>
            <button onClick={handleConfirmCancel}>OK</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;