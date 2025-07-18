import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Payment from "./components/payment/payment";
import Destinations from "./components/Destinations";
import Success from "./components/payment/success";
import MyBookings from "./components/MyBookings";
import Profile from "./components/profile";



function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/destinations" element={<Destinations/>} /> 
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="mybookings" element={<MyBookings/>}/>
        <Route path="profile" element={<Profile/>}/>
        {showPaymentModal && <Payment onClose={() => setShowPaymentModal(false)} />}
      </Routes>
    </Router>
  );
}

export default App;
