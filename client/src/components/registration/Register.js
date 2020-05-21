import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState([]);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const errorElements = errors.map((error, index) => (
    <p key={index}>{error}</p>
  ));

  const successMessage = registeredSuccessfully
    ? "Registered successfully"
    : "";

  const handleResponse = responseData => {
    setErrors(responseData.errors);
    setRegisteredSuccessfully(responseData.registeredSuccessfully);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
      passwordConfirmation
    };

    fetch("/user/register", {
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

  return registeredSuccessfully ? (
    <Redirect to="/user/login" />
  ) : (
    <div className="container">
      <div className="register-container">
        <div className="errors-container">{errorElements}</div>
        <div className="success-message-container">{successMessage}</div>
        <div className="register-form">
          <form action="/user/register" method="post" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                id="register-form-name"
                name="name"
                value={name}
                autoComplete="on"
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                id="register-form-email"
                name="email"
                value={email}
                autoComplete="on"
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                placeholder="Create Password"
                id="register-form-password"
                name="password"
                value={password}
                autoComplete="off"
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="confirPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="register-form-confirm-password"
                name="confirmPassword"
                value={passwordConfirmation}
                autoComplete="off"
                onChange={event => setPasswordConfirmation(event.target.value)}
              />
            </div>
            <div className="register-form-submit" type="submit">
              <button className="button" id="register-button">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="already-registered-info">
          <p>Already have an account?</p>
          <Link to="/user/login">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
