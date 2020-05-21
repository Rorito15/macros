import React from "react";
import { Link } from "react-router-dom";
import "./AccountOptions.css";

function AccountOptions() {
  return (
    <div className="container">
      <div className="account-options-container">
        <p>Create an account or login</p>
        <button className="account-option-button">
          <a className="button-link" href="/user/register">
            Register
          </a>
        </button>
        <button className="account-option-button">
          <Link className="button-link" to="/user/login">Login</Link>
        </button>
      </div>
    </div>
  );
}

export default AccountOptions;
