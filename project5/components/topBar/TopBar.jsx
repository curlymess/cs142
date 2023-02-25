import React from 'react';
import {
  AppBar, Divider, Toolbar, Typography, Container, Box
} from '@mui/material';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

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
    fetchModel('/test/info')
      .then((response) => {
        this.setState({
          version: response.data.__v,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    return (
      <AppBar className="cs142-topbar-appBar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalFloristIcon edge/>
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
        </Toolbar>
      </Container>
    </AppBar>

    );
  }
}

export default TopBar;
