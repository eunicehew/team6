import React, { Component } from "react";
import "./App.css";
import TravelNav from "../TravelNav/TravelNav";
import Survey from "../Survey/Survey";
import ResultList from "../ResultList/ResultList";
import ResetPassword from "../ResetPassword/ResetPassword";
import History from "../History/History";
import Home from "../Home/Home";
import { Switch, Route } from "react-router-dom";
// import withAuth from "../AuthService/WithAuth";

/*
Author: Eunice Hew
Routing for components with the navigation bar 
*/

class App extends Component {
  render() {
    return (
      <div>
        <TravelNav loggedIn={true} />
        <Switch>
          {/* Switch home routing to index; auth logic for logged in */}
          <Route
            exact
            path="/"
            render={props => <Home {...props} isAuthed={true} />}
          />
          <Route path="/History" component={History} />
          <Route path="/Reset" component={ResetPassword} />
          <Route path="/Survey" component={Survey} />
          <Route path="/ResultList" component={ResultList} />
        </Switch>{" "}
      </div>
    );
  }
}

export default App;
//export default withAuth(App);
