import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SearchHotelResult from "./components/SearchHotelResult";
import SearchHotel from "./components/SearchHotel";
import ViewHotel from "./components/ViewHotel";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import "./App.css";
import UsersPage from "./components/UsersPage";
import NavigationBar from "./components/NavigationBar";
import axios from "axios";
function App() {
  localStorage.setItem("LOGIN", false);

  return (
    <div>
      <NavigationBar />
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchHotel />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/custinfo" element={<CustomerInformation />} />
            <Route path="/payinfo" element={<PaymentInformation />} />
            <Route path="/searchhotelresult" element={<SearchHotelResult />} />
            <Route path="/searchhotel" element={<SearchHotel />} />
            <Route path="/viewhotel" element={<ViewHotel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/userspage" element={<UsersPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

    // <div className="wrapper">
    //   <BrowserRouter>
    //     {/* {useLocation().pathname !== "/login" && <NavigationBar />} */}

    //     <Routes>
    //       <Route path="/" element={<SearchHotel />} />
    //       <Route path="/editprofile" element={<EditProfile />} />
    //       <Route path="/custinfo" element={<CustomerInformation />} />
    //       <Route path="/payinfo" element={<PaymentInformation />} />
    //       <Route path="/searchhotelresult" element={<SearchHotelResult />} />
    //       <Route path="/searchhotel" element={<SearchHotel />} />
    //       <Route path="/viewhotel" element={<ViewHotel />} />

    //       <Route path="/login" element={<Login />} />
    //       <Route path="/registration" element={<Register />} />
    //       <Route path="/success" element={<Success />} />
    //       <Route path="/cancel" element={<Cancel />} />
    //       <Route path="/userspage" element={<UsersPage />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
