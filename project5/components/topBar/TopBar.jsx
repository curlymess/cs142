import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

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
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
              Noor Fakih
          </Typography>
          <Typography variant='h6' color='inherit' className='title'>
						Photo Application: v{this.state.version}
					</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
