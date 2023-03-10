import React from 'react';
import {
    Button,
    Box,
    Input,
    FormControl,
    InputLabel
} from '@mui/material';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick() {
        const formData = new FormData();
        formData.append('loginName', this.state.loginName);

        axios.post('/admin/login', formData)
            .then(res => {
                this.props.handler(res.data.first_name);
                this.props.history.push(`/users/${res.data._id}`);
            })
            .catch(err => {
                console.log("handleCLick Log IN err" + err);
                this.setState({
                    loginName: ''
                });
            });
    }

    handleInputChange(e) {
        this.setState({
            loginName: e.target.value
        });
        console.log("handleChange: setState = " + this.state.loginName);
    }

    render() {
        return (
            <Box sx={{width:'100%'}}>
                <FormControl variant="standard">
                    <InputLabel htmlFor="login-name">Login Name</InputLabel>
                    <Input id="login-name" value={this.state.loginName} onChange={this.handleInputChange} />
                </FormControl>
                <Button type="submit" variant="contained" component="button" onClick={this.handleSubmitClick}>Login</Button>
            </Box>
        );
    }

}

export default LoginRegister;