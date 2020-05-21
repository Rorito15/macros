import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, dispatch } = useContext(UserContext);

  const handleResponse = responseData => {
    console.log("Received a response from the server:", responseData);

    if (responseData.success) {
      const updatedInfo = {
        loggedIn: true,
        name: responseData.userName,
        email: responseData.email
      };

      dispatch({ type: "UPDATE_USER_INFO", updatedInfo });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      email,
      password
    };

    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => handleResponse(resData))
      .catch(error => console.log(error));
  };

  return user.loggedIn ? (
    <Redirect to="/user/dashboard" />
  ) : (
    <div className="container">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              id="login-form-email"
              name="email"
              value={email}
              autoComplete="on"
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="login-form-password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="login-form-submit">
            <button className="button" id="register-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
