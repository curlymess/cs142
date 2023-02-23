import React from 'react';
import './Viewswitch.css';
import States from '../states/States';
import Example from '../example/Example';

class Viewswitch extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currView: 'example'
        };
        this.handleBttn = this.handleBttn.bind(this);
    }

    // change state when clicked
    // true or 1 = example | false or 0 = state
    handleBttn(){
        this.setState({
            currView: this.state.currView === 'example' ? 'state' : 'example'
        });
    }

    render() {
        let displayComponet = this.state.currView === 'example' ? <Example/> : <States/> ;
        return (
            <div>
                <button className='cs142-viewswitch' onClick={this.handleBttn}>{this.state.currView === 'example' ? 'Currently Examples - Click to Switch to States' : 'Currently States - Click to Switch to Examples'}</button>
                {displayComponet}
            </div>
        );
    }
}

export default Viewswitch;