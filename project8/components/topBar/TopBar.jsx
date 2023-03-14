import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton } from '@mui/material';
import './TopBar.css';
import { Link } from 'react-router-dom';

import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

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
      firstName: null,
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

            {/* https://mui.com/material-ui/react-app-bar/ */}

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
