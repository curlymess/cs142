import React from 'react';
import './States.css';

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

    // create 
    this.state = {
      stateName:''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({stateName:event.target.value});
  }

  render() {
    // access all states with window.cs142models.statesModel(), filter array to those containing substr
    let filterStates = window.cs142models.statesModel().filter(s => s.toLowerCase().indexOf(this.state.stateName.toLowerCase()) !== -1);
    
    // not found message handling
    if( filterStates.length === 0){
      filterStates = "Nada :/"
    } else { // map to list
      filterStates = filterStates.map(s => (<li key={s}>{s}</li>));
    }

    return (
      <div className='cs142-states-div'>
        <div className='cs142-states-horizontal'>
          <p>Search for </p>
          <input type="text" onChange={this.handleChange} value={this.state.stateName} />
        </div>
        <p>Results</p>
        <ol>
          {filterStates}
        </ol>
      </div>
    );
  }
}

export default States;
