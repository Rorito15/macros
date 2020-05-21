import React, { createContext, useReducer, useEffect } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

function UserContextProvider(props) {
  const initalState = {
    loggedIn: false,
    name: null,
    email: null
  };

  const [user, dispatch] = useReducer(userReducer, initalState, () => {
    // initialise any fields here from e.g. APIs
    let userInfo = initalState;
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      userInfo = storedUserInfo;
    }
    return userInfo;
  });

  // only activates when 'user' changes
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user]);

  return (
    // Note: you can pass in any functions created in the functional component to the 'value' so that other classes can use them
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
