import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, IconButton } from '@mui/material';
import './TopBar.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.currVersion = 0;
    this.handleLogOutClick = this.handleLogOutClick.bind(this);

    this.source = axios.CancelToken.source();

    axios.get('http://127.0.0.1:3000/test/info', { cancelToken: this.source.token })
      .then((response) => {
        console.log("curr version " + response.data.version);
        this.currVersion = response.data.version;
      })
      .catch((err) => {
        console.log(err);
      });  
  }

  componentWillUnmount(){
    this.source.cancel("cancelled by topbar");
  }

  handleLogOutClick () {
    axios.post('admin/logout' )
    .then(( res ) => {
      if(res.status === 200){
        this.props.handler(null);
        console.log("fully logged out")
      }
    })
    .catch(err => console.log(err));
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
                Photo Application v{this.currVersion}
              </Typography>

              {/* https://mui.com/material-ui/react-app-bar/ */}
              
                {
                  this.props.loggedInUser ? 
                  <div>
                    <IconButton color="secondary" aria-label="upload picture">
                      {/* <input hidden accept="image/*" type="file" /> */}
                      <UploadIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="log out" onClick={this.handleLogOutClick}>
                      {/* <input hidden accept="image/*" type="file" /> */}
                      <LogoutIcon />
                    </IconButton>
                  </div>
                  : 
                  <Button variant="contained" color="secondary">
                    <Typography variant="h6" noWrap >Log In</Typography>
                  </Button>
                }
              

          </Toolbar>    
        </Container>
        <Container maxWidth="xl" className='bar2Container'>
          <div className='bar2'>
          {
            this.props.loggedInUser ? 
            <div className='bar2LoggedIn'>

              <Typography variant="h2" noWrap > 
                hello there, &nbsp; 
                { this.props.loggedInUser ? this.props.loggedInUser : 'no one' }
              </Typography>

              <Typography variant="h2" noWrap> 
                currently viewing &nbsp; 
                { this.props.currUser ? this.props.currUser : 'no one' }
              </Typography>

            </div>
            : 
            <Typography className='bar2SignedOut'> 
              why don't you log in? 
            </Typography>
          }
          </div>
        </Container>
      </AppBar>
    );
  }
}

export default TopBar;
