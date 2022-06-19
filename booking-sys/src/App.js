import "./App.css";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
function App() {
  const [data, setData] = React.useState(null);

  // // HTTP GET request
  // React.useEffect(() => {
  //   fetch("/api/getAll")
  //     .then((res) => toString(res))
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      <h1>{data}</h1>
      <Register />
      <Login />
      {/* <UserProfile/> */}
      {/* <CustomerInformation /> */}
      {/* <PaymentInformation /> */}
    </div>
  );
}

export default App;
