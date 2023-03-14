import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper, ThemeProvider, Typography,
} from '@mui/material';
import './styles/main.css';

import theme from './lib/theme';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';
import FavoritesPage from './components/favorites/favoritesPage';

import axios from 'axios';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      loggedInUser: localStorage.getItem("loggedInUser"),
      loggedInFirstName: localStorage.getItem("loggedInFirstName"),
      isLoggedIn: Boolean(localStorage.getItem("loggedInUser")),
    };
  }

  handleCurrUserChange = currUser => {
    this.setState({ currUser: currUser });
    localStorage.setItem('currUser', currUser);
  };

  handleLogIn = (loginData) => {
    this.setState({
      loggedInUser: loginData,
      isLoggedIn: true,
      loggedInFirstName: loginData.first_name,
    });
    console.log("loginData" + loginData);
    console.log("first name: " + loginData.first_name)
    localStorage.setItem('loggedInUser', loginData);
    localStorage.setItem('loggedInFirstName', this.state.loggedInFirstName);
    localStorage.setItem('isLoggedIn', true);
  };

  handleLogOut = () => {
    axios.post("/admin/logout", {})
    .then(res => {
      localStorage.removeItem("currUser");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInFirstName");
      localStorage.removeItem('isLoggedIn');

      this.setState({
        loggedInUser: null,
        isLoggedIn: false,
        currUser: null,
        loggedInFirstName: null,
      });
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar currUser={this.state.currUser} isLoggedIn={this.state.isLoggedIn} firstName={this.state.loggedInFirstName} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} currUserHandler={this.handleCurrUserChange} />
            </Grid>
            <div className="cs142-main-topbar-buffer" />

            <Grid item sm={3}>
              <Paper className="user-list">
                <UserList loggedInUser={this.state.loggedInUser} />
              </Paper>
            </Grid>

            <Grid item sm={9}>
              <Paper className="user-photos">
                <Switch>
                  <Route path="/login-register"
                    render={((props) => <LoginRegister {...props} handleLogIn={this.handleLogIn} loggedInUser={this.loggedInUser} />)}
                  />


                  {this.state.isLoggedIn ?
                    (
                      <Route path="/users/:userId"
                        render={((props) => <UserDetail {...props} handler={this.handleCurrUserChange} />)}
                      />
                    ) : (
                      <Redirect path="/users/:userId" to="/login-register" />
                    )}

                  {this.state.isLoggedIn ?
                    (
                      <Route path="/photos/:userId"
                        render={((props) => <UserPhotos {...props} handler={this.handleCurrUserChange} />)}
                      />
                    ) : (
                      <Redirect path="/photos/:userID" to="/login-register" />
                    )}

                  {this.state.isLoggedIn ?
                    (
                      <Route path="/users">
                        <UserList loggedInUser={this.state.loggedInUser} />
                      </Route>
                    ) : (
                      <Redirect path="/users" to="/login-register" />
                    )}

                  {this.state.isLoggedIn ?
                    (
                      <Route path="/favorites"
                        render={((props) => <FavoritesPage {...props} loggedInUser={this.state.loggedInUser} />)}
                      />
                    ) : (
                      <Redirect path="/favorites" to="/login-register" />
                    )}

                  <Route path="/">
                    <Redirect path="/" to="/login-register" />
                  </Route>




                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <PhotoShare />
  </ThemeProvider>,
  document.getElementById('photoshareapp'),
);
