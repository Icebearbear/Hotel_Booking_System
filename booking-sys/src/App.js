import "./App.css";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHotelResult from "./components/SearchHotelResult";
import SearchHotel from "./components/SearchHotel";
import ViewHotel from "./components/ViewHotel";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import BookingHistory from "./components/BookingHistory";
import "./App.css";
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/custinfo" element={<CustomerInformation />} />
          <Route path="/payinfo" element={<PaymentInformation />} />
          <Route path="/searchhotelresult" element={<SearchHotelResult />} />
          <Route path="/searchhotel" element={<SearchHotel />} />
          <Route path="/viewhotel" element={<ViewHotel />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
