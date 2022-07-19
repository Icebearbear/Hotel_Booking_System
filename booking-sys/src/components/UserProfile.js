import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [dbDocId, setDocId] = useState("");
  const [uid, setUid] = useState("");

  const userID = localStorage.getItem("USER_ID");
  useEffect(() => {
    axios
      .get("http://localhost:3001/user", { params: { uid: userID } })
      .then((res) => {
        console.log(res);
        /// set user account information on webpage
        setFName(res.data.data.first_name);
        setLName(res.data.data.last_name);
        setEmail(res.data.data.email);
        setUid(res.data.data.uid);
        setDocId(res.data.id);

        //// reformat the object returned from backend and store it in localStorage
        const dbUserObj = {
          first_name: fname,
          last_name: lname,
          email: email,
          uid: uid,
          dbdocId: dbDocId,
        };
        const userDBAccount = localStorage.setItem(
          "USER_DB_ACCOUNT",
          JSON.stringify(dbUserObj)
        );
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const logOut = () => {
    console.log("logout callback");
    axios
      .post("http://localhost:3001/logout")
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class="image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            <img
              src="https://i.imgur.com/wvxPV9S.png"
              height="100"
              width="100"
            />
          </button>
          <span class="name mt-3">{fname + " " + lname}</span>
          <span class="idd">{userID}</span>
          <div class="d-flex flex-row justify-content-center align-items-center gap-2">
            <span class="idd1">{email}</span>
            <span>
              <i class="fa fa-copy"></i>
            </span>
          </div>
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            <span class="number">
              1069 <span class="follow">Followers</span>
            </span>
          </div>
          <div onClick={() => navigate("/editprofile")} class="d-flex mt-2">
            <button class="btn1 btn-dark">Edit Profile</button>
          </div>
          <div onClick={logOut} class="d-flex mt-2">
            <button class="btn1 btn-dark">Logout</button>
          </div>
          <div onClick={() => navigate("/searchhotel")} class="d-flex mt-2">
            <button class="btn1 btn-dark">Back to Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
