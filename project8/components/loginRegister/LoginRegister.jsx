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
            login_name: '',
            password: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.source = axios.CancelToken.source();
    }

    handleLoginButtonClick() {
        const formData = new FormData();
        formData.append('login_name', this.state.login_name);
        formData.append('password', this.state.password);

        axios.post('/admin/login', formData, { cancelToken: this.source.token })
            .then(res => {
                const user = res.data;
                this.props.handleLogIn(res.data);
                this.props.history.push(`/users/${user._id}`);
            })
            .catch(err => {
                console.log("handleCLick Log IN err" + err);
                this.setState({
                    login_name: '',
                    password: '',
                });
            });
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("handleInputChange: setState = " + this.state.login_name);
    }

    componentWillUnmount() {
        this.source.cancel("cancelled by user in userphotos");
    }

    render() {
        return (
            <Grid container spacing={1} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                {/* log in */}
                {/* form */}
                <Grid item >

                    <Grid item >
                        <Typography variant="h4">Welcome back!</Typography>
                    </Grid>

                    <Grid item>
                        <FormControl variant="standard" >
                            <InputLabel htmlFor="login-name">Login Name</InputLabel>
                            <Input id="login-name" name='login_name' value={this.state.login_name} onChange={this.handleInputChange} />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard" >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" name='password' type='password' value={this.state.password} onChange={this.handleInputChange} />
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
                    <RegisterNewUserForm handleLogIn={this.props.handleLogIn} history={this.props.history} />
                </Grid>

            </Grid>
        );
    }

}

export default LoginRegister;