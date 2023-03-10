import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import './TopBar.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.currVersion = 0;

    axios.get('http://127.0.0.1:3000/test/info')
      .then((response) => {
        console.log("curr version " + response.data.version);
        this.currVersion = response.data.version;
      })
      .catch((err) => {
        console.log(err);
      });
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

              {/* TO-DO: Make log in conditional and show log out */}
              {/* https://mui.com/material-ui/react-app-bar/ */}
              <Button type="submit" variant="contained" color="secondary">
                {
                  this.props.loggedInUser ? <Typography noWrap>Sign Out</Typography> : <Typography noWrap>Log In</Typography>
                }
              </Button>

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
