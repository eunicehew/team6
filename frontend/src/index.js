import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { Login } from "./Login";
import * as serviceWorker from "./serviceWorker";
import Home2 from "./Home/Home.2";
import ResetPassword from "./ResetPassword/ResetPassword";
import "./styles/main.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route
        exact
        path="/"
        render={props => <Home2 {...props} isAuthed={false} />}
      /> */}
      <Route exact path="/" component={Home2} />
      <Route path="/change-password" component={ResetPassword} />
      <Route exact path="/login" component={Login} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
