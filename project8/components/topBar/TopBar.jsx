import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Menu, MenuItem } from '@mui/material';
import './TopBar.css';
import { Link } from 'react-router-dom';

import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import axios from 'axios';
import NewPhoto from '../newPhoto/newPhoto';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currVersion: 0,
      anchorEl: null,
    };

    this.source = axios.CancelToken.source();
    axios.get('/test/info', { cancelToken: this.source.token })
      .then((response) => {
        console.log("curr version " + response.data.version);
        this.setState({
          currVersion: response.data.version,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.source.cancel("cancelled by topbar");
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDeleteAccountClick = () => {
    this.setState({ anchorEl: null });
    this.props.handleDeleteUser();
  };

  render() {
    return (
      <AppBar className="cs142-topbar-appBar">
        <Container maxWidth="xl">
          <Toolbar disableGutters className='bar1'>

            <div className='logo'>
              <LocalFloristIcon />
              <Typography variant="h3" noWrap>
                Noor Fakih
              </Typography>
            </div>

            <Typography variant="h1" noWrap >
              Photo Application v{this.state.currVersion}
            </Typography>

            {
              this.props.isLoggedIn ?
                (
                  <div className="actionButtons">
                    <Link to={`/favorites`}>
                      <IconButton color="secondary" aria-label="favorites" >
                        <BookmarksIcon />
                      </IconButton>
                    </Link>

                    <NewPhoto />

                    <div>
                      <IconButton aria-label="manage-account" color="secondary" onClick={this.handleMenu}>
                        <ManageAccountsIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.handleDeleteAccountClick}>Delete Account</MenuItem>
                      </Menu>
                    </div>

                    <IconButton color="secondary" aria-label="log out" onClick={this.props.handleLogOut}>
                      <LogoutIcon />
                    </IconButton>
                  </div>
                ) : (
                  <Button variant="contained" color="secondary">
                    <Typography variant="h6" noWrap >Log In</Typography>
                  </Button>
                )
            }


          </Toolbar>
        </Container>
        <Container maxWidth="xl" className='bar2Container'>
          <div className='bar2'>
            {
              (this.props.isLoggedIn) ?
                (
                  <div className='bar2LoggedIn'>

                    <Typography variant="h2" noWrap >
                      hello there, &nbsp;
                      {this.props.isLoggedIn ? this.props.firstName : 'no one'}
                    </Typography>

                    <Typography variant="h2" noWrap>
                      currently viewing &nbsp;
                      {this.props.currUser ? this.props.currUser : 'no one'}
                    </Typography>
                  </div>
                ) : (
                  <Typography className='bar2SignedOut'>
                    how about logging in?
                  </Typography>
                )
            }
          </div>
        </Container>
      </AppBar>
    );
  }
}

export default TopBar;
