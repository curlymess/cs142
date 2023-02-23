import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/Header'
import Toolbar from './components/toolbar/Toolbar';

ReactDOM.render(
  <div><Header/><Toolbar/></div>,
  document.getElementById('reactapp'),
);
