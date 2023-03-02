import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper, ThemeProvider
} from '@mui/material';
import './styles/main.css';

import theme from './lib/theme';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
    };
  }

  handleCurrUserChange = currUser => {
    this.setState({currUser: currUser});
  };

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar currUser={this.state.currUser}/>
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        
        <Grid item sm={3}>
          <Paper className="user-list">
            <UserList />
          </Paper>
        </Grid>

        <Grid item sm={9}>
          <Paper className="user-photos">
            <Switch>
              <Route path="/users/:userId"
                render={( (props) => <UserDetail {...props} handler={this.handleCurrUserChange}/> )}
              />
              <Route path="/photos/:userId"
                render ={( (props) => <UserPhotos {...props} handler={this.handleCurrUserChange} /> )}
              />
              <Route path="/users" component={UserList} />
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
