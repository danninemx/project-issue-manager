import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./pages/Home";
// import Saved from "./pages/Saved";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";
// import SubmitIssue from "./pages/SubmitIssue";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/LandingPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} /> */}

          <Route exact path="/" component={LandingPage} />
          {/* <Route exact path="/submitissue" component={SubmitIssue} /> */}
          {/* <Route exact path="/signin" component={Signin} /> */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/landing" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
