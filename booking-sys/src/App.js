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
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth";

const App = () => {
  const [login, setLoginSesh] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("LOGIN", null);
    setLoginSesh(false);
  }, []);

  const setAuth = (data) => {
    if (data) {
      console.log("sesh login", data);
      sessionStorage.setItem("LOGIN", data);
      setLoginSesh(data);
      console.log("Data in setAuth: ", data);
    } else {
      sessionStorage.setItem("LOGIN", null);
    }
  };

  return (
    <div>
      {/* <NavigationBar className="nav-bar-items" /> */}
      <div className="wrapper">
        <AuthContext.Provider value={{ login, setLoginSesh: setAuth }}>
          <BrowserRouter>
            <Routes>
              <Route element={<WitNavBar />}>
                <Route path="/" element={<SearchHotel />} />
                <Route path="/payinfo" element={<PaymentInformation />} />
                <Route path="/searchhotel" element={<SearchHotel />} />
              </Route>

              <Route
                path="/searchhotelresult"
                element={<SearchHotelResult />}
              />
              <Route path="/viewhotel" element={<ViewHotel />} />
              <Route element={<WithoutNavBar />}>
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/custinfo" element={<CustomerInformation />} />
                <Route path="/userspage" element={<UsersPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </div>
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

export default App;
