import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchHotelResult from "./components/SearchHotelResult";
import SearchHotel from "./components/SearchHotel";
import ViewHotel from "./components/ViewHotel";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import "./App.css";
import UsersPage from "./components/UsersPage";
import NavigationBar from "./components/NavigationBar";
import SearchDataNav from "./components/SearchDataNav";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div>
      {/* <NavigationBar className="nav-bar-items" /> */}
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route element={<WitNavBar />}>
              <Route path="/" element={<SearchHotel />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/custinfo" element={<CustomerInformation />} />
              <Route path="/payinfo" element={<PaymentInformation />} />
              <Route path="/searchhotel" element={<SearchHotel />} />
                
              <Route path="/userspage" element={<UsersPage />} />
            </Route>
            
            <Route
                  path="/searchhotelresult"
                  element={<SearchHotelResult />}
                />
            <Route path="/viewhotel" element={<ViewHotel />} />
            <Route element={<WithoutNavBar />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Register />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    // </div>
  );
};

const WithoutNavBar = () => {
  return <Outlet />;
};

const WitNavBar = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

const WitSearchBar = () => {
  return (
    <div>
      <SearchDataNav />
      <Outlet />
    </div>
  );
};

export default App;
