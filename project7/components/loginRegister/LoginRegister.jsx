import * as React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { Typography, Grid, FormControl, InputLabel, Input, Button } from "@material-ui/core";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      password: "",
    };
    this.isLogged = null; // use for prompting user when login fails
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleLoginSubmit = event => { // async: to use "await" inside the func
    event.preventDefault();  // prevent submit form and reload page behavior.
    console.log("Sending login Info to server: ", this.state.loginName + "  " + this.state.password);

    // axios to send a POST request with login info
    const loginInfo = {         // login info to server
      login_name: this.state.loginName, 
      password: this.state.password 
    };  

    axios
      .post("/admin/login", loginInfo) // POST request sent!
      .then(response => {   // Handle success
        console.log(`LoginRegister Success!`); 
        this.isLogged = true;  
        this.props.handler(response.data);  // for passing loggin user data and logged info back to TopBar
      })
      .catch(error => {     // Handle error
        console.log(`LoginRegister failed`); 
        console.log("username: " + this.state.loginName);
        console.log("pass: " + this.state.password);
        this.isLogged = false;     
        this.props.handler(null);  // for passing loggin user's first name and logged info back to TopBar
        console.log(error);
      });
  };
  

  render() {

    const loggedInUser = this.props.loggedInUser;
    if (loggedInUser) {
      return <Redirect from="/login-register" to={`/users/${loggedInUser._id}`} />;
    }

    return (
      <Grid container direction="column" alignItems="center">
          <Typography variant="h3">Welcome!</Typography>
        <br/>
        {/* Login Form */}
        <Grid item xs={5}>
          <form onSubmit={this.handleLoginSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="loginName">Login Name:</InputLabel>
              <Input name="loginName" id="loginName" type="text" autoFocus value={this.state.loginName} onChange={this.handleInputChange}/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password:</InputLabel>
              <Input name="password" id="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
            </FormControl>
            <br/><br/>
            <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
            { this.isLogged === false && <Typography style={{ color: "red" }}>Not a valid login name, try again</Typography> }
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default LoginRegister;