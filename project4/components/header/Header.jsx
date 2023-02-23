import React from 'react';
import './Header.css';

class Header extends React.Component{
    render() {
        return (
            <div className='cs142-header'>
                <h2>CS142 - Assignment 4</h2>
                <h4>by</h4>
                <h2>Noor Fakih</h2>
            </div>
        );
    }
}

export default Header;