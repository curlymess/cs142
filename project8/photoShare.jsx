import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper, ThemeProvider, Typography
} from '@mui/material';
import './styles/main.css';

import theme from './lib/theme';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';
import Favorites from './components/favorites/favorites';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: localStorage.getItem('currUser'),
      loggedInUser: localStorage.getItem('loggedInUser'),
    };
  }

  handleCurrUserChange = currUser => {
    this.setState({ currUser: currUser });
    localStorage.setItem('currUser', currUser);
  };

  handleLoggedInUserChange = loggedInUser => {
    this.setState({ loggedInUser: loggedInUser });
    localStorage.setItem('loggedInUser', loggedInUser);
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar currUser={this.state.currUser} loggedInUser={this.state.loggedInUser} handler={this.handleLoggedInUserChange} currUserHandler={this.handleCurrUserChange} />
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
                    render={((props) => <LoginRegister {...props} handler={this.handleLoggedInUserChange} loggedInUser={this.loggedInUser} />)}
                  />

                  {this.state.loggedInUser ?
                    (
                      <Route path="/users/:userId"
                        render={((props) => <UserDetail {...props} handler={this.handleCurrUserChange} />)}
                      />
                    ) : (
                      <Redirect path="/users/:userId" to="/login-register" />
                    )}

                  {this.state.loggedInUser ?
                    (
                      <Route path="/photos/:userId"
                        render={((props) => <UserPhotos {...props} handler={this.handleCurrUserChange} />)}
                      />
                    ) : (
                      <Redirect path="/photos/:userID" to="/login-register" />
                    )}

                  {this.state.loggedInUser ?
                    (
                      <Route path="/users">
                        <UserList loggedInUser={this.state.loggedInUser} />
                      </Route>
                    ) : (
                      <Redirect path="/users" to="/login-register" />
                    )}

                  {/* {this.state.loggedInUser ?
                    (
                      <Route path="/">
                        <Typography variant="h3">Welcome to my photosharing app!</Typography>
                      </Route>
                    ) : (
                      <Redirect path="/" to="/login-register" />
                    )} */}


                      <Route path="/">
                        <Redirect path="/" to="/login-register" />
                      </Route>

                    {this.state.loggedInUser ?
                    (
                      <Route path="/favorites"
                        render={((props) => <Favorites {...props} />)}
                      />
                    ) : (
                      <Redirect path="/favorites" to="/login-register" />
                    )}  

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
