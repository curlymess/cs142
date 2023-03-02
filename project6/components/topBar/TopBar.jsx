import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
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
          <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <div className='logo'> 
              <LocalFloristIcon />
              <Typography variant="h3" noWrap sx={{ mr: 1, display: "flex", }}>  
                Noor Fakih 
              </Typography>
            </div>

            <Typography variant="h1" noWrap sx={{ mr: 1, display: "flex", }}>
              Photo Application v{this.currVersion}
            </Typography>

            <Typography variant="h2" noWrap
              sx={{display: "flex"}}> currently viewing &nbsp; 
              { this.props.currUser ? this.props.currUser : 'nothing' }
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default TopBar;
