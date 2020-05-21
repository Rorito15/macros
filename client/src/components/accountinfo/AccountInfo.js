import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";
import "./AccountInfo.css";

function AccountInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateRegistered, setDateRegistered] = useState("");
  const { user } = useContext(UserContext);

  const formattedDate = dateRegistered
    ? moment(dateRegistered).format("Do MMMM YYYY")
    : "";

  useEffect(() => {
    function getUserAccountInfo() {
      fetch("/user/account")
        .then(res => {
          console.log(res);
          console.log(res.authorized);
          if (!res.ok) {
            throw new Error("Error when retrieving account information");
          }
          return res.json();
        })
        .then(res => {
          const userInfo = res.userInfo;
          setName(userInfo.name);
          setEmail(userInfo.email);
          setDateRegistered(userInfo.date);
        })
        .catch(error => console.log(error));
    }
    getUserAccountInfo();
  }, [user.email]);

  return (
    <div className="container">
      <h1>Account Info</h1>
      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
      <h3>Date Registered: {formattedDate}</h3>
    </div>
  );
}

export default AccountInfo;
