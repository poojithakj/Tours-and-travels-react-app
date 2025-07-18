import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./Payment.css"; // Import CSS for styling

const Payment = ({ onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const [upiOptions, setUpiOptions] = useState([
    { name: "G Pay", img: "/icons/gpay.png" },
    { name: "PhonePe", img: "/icons/phone.png" },
  ]); // Default UPI options

  const [selectedUpi, setSelectedUpi] = useState("G Pay"); // Default selected UPI
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const newUpiOptions = [
    { name: "Paytm", img: "/icons/paytm.png" },
    { name: "BHIM UPI", img: "/icons/bhim.png" },
    { name: "Amazon Pay", img: "/icons/amazon.png" },
  ];

  // Handle UPI selection (adds new UPI to the list)
  const handleUpiSelection = (upi) => {
    if (!upiOptions.find((item) => item.name === upi.name)) {
      setUpiOptions([...upiOptions, upi]); // Add new UPI to main options
    }
    setSelectedUpi(upi.name);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Handle payment submission
  const handleSubmit = () => {
    if (selectedUpi) {
      navigate("/success"); // Navigate to success page
    } else {
      alert("Please select a UPI method!");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close Button */}
        <span className="close" onClick={onClose}>&times;</span>
        
        <h2>Payment</h2>

        {/* UPI Payments Section */}
        <h3 className="section-title">UPI Payments</h3>
        <div className="upi-list">
          {upiOptions.map((upi, index) => (
            <div
              key={index}
              className={`upi-option ${selectedUpi === upi.name ? "selected" : ""}`}
              onClick={() => setSelectedUpi(upi.name)}
            >
              <img
                src={upi.img}
                alt={upi.name}
                className="upi-icon"
              />
              {upi.name}
              <span className={`checkmark ${selectedUpi === upi.name ? "visible" : ""}`}>&#10004;</span>
            </div>
          ))}
        </div>

        {/* Add Other UPI Section */}
        <h3 className="section-title">Add Other UPI</h3>
        <div className="new-upi-container" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <span>+ New UPI</span>
        </div>

        {/* UPI Dropdown */}
        {isDropdownOpen && (
          <div className="upi-dropdown">
            {newUpiOptions.map((option, index) => (
              <div key={index} className="upi-dropdown-item" onClick={() => handleUpiSelection(option)}>
                <img src={option.img} alt={option.name} className="upi-dropdown-icon" />
                {option.name}
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Payment;
