import "./App.css";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHotelResult from "./components/SearchHotelResult";
import SearchHotel from "./components/SearchHotel";
import ViewHotel from "./components/ViewHotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/custinfo" element={<CustomerInformation />} />
        <Route path="/payinfo" element={<PaymentInformation />} />
        <Route path="/searchhotelresult" element={<SearchHotelResult />} />
        <Route path="/searchhotel" element={<SearchHotel />} />
        <Route path="/viewhotel" element={<ViewHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
