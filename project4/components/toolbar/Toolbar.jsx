import React from 'react';
import './Toolbar.css';

import States from '../states/States';
import Example from '../example/Example';

import { HashRouter, Route, Link } from 'react-router-dom';

class Toolbar extends React.Component{
    constructor(props){
        super(props);

    }

    render() {
        return (
            <HashRouter className='cs142-toolbar'>
                <header>
                    <Link to="/example">Example</Link>
                    <Link to="/states">States</Link>
                </header>   
                <Route path="/example" component={Example} />
                <Route path="/states" component={States} />
            </HashRouter>
        );
    }
}

export default Toolbar;