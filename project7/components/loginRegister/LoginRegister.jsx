import React from 'react';
import {
    Button,
    Input,
    FormControl,
    InputLabel,
    Typography,
    Grid,

} from '@mui/material';
import axios from 'axios';
import RegisterNewUserForm from './registerNewUserForm';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            registerName: '',
            loginPassword: '',
            registerPassword: '',
            registerPassword2: '',
            firstName: '',
            lastName: '',
            occupation: '',
            location: '',
            description: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
		this.source = axios.CancelToken.source();
    }

    handleLoginButtonClick() {
        const formData = new FormData();
        formData.append('loginName', this.state.loginName);
        formData.append('loginPassword', this.state.loginPassword);

        axios.post('/admin/login', formData, { cancelToken: this.source.token })
            .then(res => {
                this.props.handler(res.data.first_name);
                this.props.history.push(`/users/${res.data._id}`);
            })
            .catch(err => {
                console.log("handleCLick Log IN err" + err);
                this.setState({
                    loginName: '',
                    loginPassword: '',
                });
            });
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("handleInputChange: setState = " + this.state.loginName);
    }

    componentWillUnmount() {
		this.source.cancel("cancelled by user in userphotos");
	}

    render() {
        return (
            <Grid container spacing={1} sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} >  
            {/* log in */}
                {/* form */}
                <Grid item >

                    <Grid item >
                        <Typography variant="h4">Welcome back!</Typography>
                    </Grid>
                    
                    <Grid item>
                        <FormControl variant="standard" >
                            <InputLabel htmlFor="login-name">Login Name</InputLabel>
                            <Input id="login-name" name='loginName' value={this.state.loginName} onChange={this.handleInputChange} />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard" >
                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                        <Input id="loginPassword" name='loginPassword' type='password' value={this.state.loginPassword} onChange={this.handleInputChange} />
                    </FormControl>
                    </Grid>
                </Grid>
                {/* button */}
                <Grid item>
                    <Button variant="contained" color="secondary" component="button" onClick={this.handleLoginButtonClick}>
                        <Typography variant="h6" noWrap >Log In</Typography>
                    </Button>
                </Grid>

            {/* register */}
                <Grid item >
                    <RegisterNewUserForm handler={this.props.handler} history={this.props.history}/>
                </Grid>

            </Grid>
        );
    }

}

export default LoginRegister;