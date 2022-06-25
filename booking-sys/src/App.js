import "./App.css";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Card from "react-bootstrap/Card";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/mainpage" element={<UserProfile />} />
        <Route path="/custinfo" element={<CustomerInformation />} />
        <Route path="/payinfo" element={<PaymentInformation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
