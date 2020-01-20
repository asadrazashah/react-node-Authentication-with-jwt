import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn.js";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import withAuth from "./components/withAuth";
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={withAuth(Home)} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
