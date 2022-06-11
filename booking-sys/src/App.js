import "./App.css";
import React from "react";
import LoginRegister from "./components/LoginRegister";
import CustomerInformation from "./components/CustomerInformation";
import PaymentInformation from "./components/PaymentInformation";
function App() {
  const [data, setData] = React.useState(null);

  // HTTP GET request
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      {/* <LoginRegister /> */}
      {/* <CustomerInformation /> */}
      <PaymentInformation />
    </div>
  );
}

export default App;
