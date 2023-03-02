import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import './TopBar.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
// import fetchModel from '../../lib/fetchModelData';
import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: '',
    };
  }

  componentDidMount() {
    // fetchModel('/test/info')
    axios.get('http://127.0.0.1:3000/test/info')
      .then((response) => {
        this.setState({
          version: response.data.__v,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    return (
      <AppBar className="cs142-topbar-appBar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalFloristIcon edge />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 1,
                display: "flex",
                fontFamily: "Cookie",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#F7C8E0",
                textDecoration: "none",
              }}
            >
              Noor Fakih
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 1,
                display: "flex",
                fontFamily: "Itim",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#DFFFD8",
                textDecoration: "none"
              }}
            >
              Photo Application v{this.state.version}
            </Typography>

            <Typography 
              variant="h5"
              // noWrap
              // component="a"
              // href=""
              // sx={{
              //   mr: 1,
              //   display: "flex",
              //   fontFamily: "Itim",
              //   fontWeight: 700,
              //   letterSpacing: ".3rem",
              //   color: "#FFF",
              //   textDecoration: "none",
              //   justifyContent: 'flex-end',
              // }}
              > 
              Current user: 
              { this.props.currUser ? this.props.currUser : 'nothing' }
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default TopBar;
