import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import "./Logout.css";
import { useCallback } from "react";

function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  const { dispatch } = useContext(UserContext);

  const handleLogOut = useCallback(
    responseData => {
      setLoggedOut(responseData.success);

      if (responseData.success) {
        const updatedInfo = {
          loggedIn: false,
          name: null,
          email: null
        };
        dispatch({ type: "UPDATE_USER_INFO", updatedInfo });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const logOut = () => {
      fetch("/user/logout")
        .then(res => res.json())
        .then(resData => handleLogOut(resData))
        .catch(error => console.log(error));
    };

    logOut();
  }, [handleLogOut]);

  return loggedOut ? (
    <Redirect to="/user/login" />
  ) : (
    <div className="container"></div>
  );
}

export default Logout;
