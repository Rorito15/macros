import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const { user } = useContext(UserContext);

  function Options() {
    if (user.loggedIn) {
      return (
        <ul className="nav-links">
          <Link to="/user/account">
            <li>Account</li>
          </Link>
          <Link to="/user/logout">
            <li>Logout</li>
          </Link>
        </ul>
      );
    }
    return (
      <ul className="nav-links">
        <Link to="/user/login">
          <li>Login</li>
        </Link>
        <Link to="/user/register">
          <li>Register</li>
        </Link>
      </ul>
    );
  }

  return (
    <nav className="test-flex-grow">
      <Link to="/">
        <h3>Logo</h3>
      </Link>

      <Options />
    </nav>
  );
}

export default NavigationBar;
