import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { UserContext } from "./contexts/UserContext";

import NavigationBar from "./components/navigationbar/NavigationBar";
import AccountOptions from "./components/accountoptions/AccountOptions";
import Register from "./components/registration/Register";
import UserContextProvider from "./contexts/UserContext";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import AccountInfo from "./components/accountinfo/AccountInfo";

function App() {
  return (
    // Anything within Router has the ability to use routeing
    <Router>
      <div className="App">
        {/* Anything within UserContextProvider can access the 'User Context' */}
        <UserContextProvider>
          <NavigationBar />
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            {/* to prevent the first one that matches any part of the url from being used, use 'exact' */}
            <Route exact path="/" component={Home} />
            <Route path="/user/options" component={AccountOptions} />
            <Route path="/user/register" component={Register} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/logout" component={Logout} />
            <PrivateRoute path="/user/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/user/account">
              <AccountInfo />
            </PrivateRoute>
          </Switch>
        </UserContextProvider>
      </div>
    </Router>
  );
}

// A PrivateRoute prevents the child components from being rendered if the user is not logged in
function PrivateRoute({ children, ...routeProps }) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...routeProps}
      render={() => (user.loggedIn ? children : <Redirect to="/user/login" />)}
    />
  );
}

export default App;
