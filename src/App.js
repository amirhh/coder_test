import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';
//Gstate
import Gstate from "./containers/GlobalState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      users: {}
    }
  }
  componentWillMount() {
    Gstate.Domain = 'http://api.pascoapp.ir/';
    Gstate.CTimeOut = 5 * 1000;
    Gstate.darkBg_default = "000000";
    Gstate.darkBg_table = "000000";
    Gstate.darkBg_th = "000000";
    Gstate.animationIn = "fadeInUp";
    Gstate.animationOut = "fadeOutUp";
    Gstate.percent = 0;
    Gstate.price = 0;
    Gstate.androidPrice=1000;
    Gstate.iosPrice=1200;
    Gstate.crossPrice=1500;
  }

  render() {

    if (this.state.isAuthenticated) {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/login" name="login Page" component={Login} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      )
    }
    else {
      return (
        <HashRouter>
          <Switch>
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route path="/" name="Login Page" component={Login} />
          </Switch>
        </HashRouter >
      )
    }
  }
}

export default App;
