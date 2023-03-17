import React, { useState, useEffect } from 'react';
import {
  Button, Input, FormControl, InputLabel,
  Typography, Grid, DialogContent, Dialog,
  AppBar, Toolbar, IconButton, FormLabel
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';

function RegisterNewUserForm(props) {
  const defaultValues = {
    login_name: '',
    password: '',
    registerPassword2: '',
    first_name: '',
    last_name: '',
    occupation: '',
    location: '',
    description: '',
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const source = axios.CancelToken.source();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.password !== formValues.registerPassword2) {
      enqueueSnackbar("passwords do not match :/", { variant: "error" });
      return;
    }

    axios.post('/user', formValues, { cancelToken: source.token })
      .then(res => {
        const user = res.data;
        props.handleLogIn(user);
        props.history.push(`/users/${user._id}`);
        handleClose();
        enqueueSnackbar("successfully registered, welcome :)", { variant: 'success' });
      }).catch(err => {
        console.log("registration fail: " + err);
        setFormValues(defaultValues);
        enqueueSnackbar(err, { variant: 'error' });
      });

      
  };

  useEffect(() => {
    source.cancel();
    console.log("acted!");
    return () => {
      console.log("useEffect returned");
    };
  }, []);


  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Typography variant="h7" sx={{ textDecoration: 'underline' }}>Need an account? Register now!</Typography>
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sign up!
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>


          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center" justify="center" direction="column">
              {/* Register Form */}
              <Grid item sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FormLabel>What is your name?</FormLabel>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="first_name">First Name</InputLabel>
                  <Input id="first_name" name='first_name' value={formValues.first_name} onChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="last_name">Last Name</InputLabel>
                  <Input id="last_name" name='last_name' value={formValues.last_name} onChange={handleInputChange} />
                </FormControl>
              </Grid>

              <Grid item sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FormLabel>Tell Me More About You</FormLabel>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <Input id="location" name='location' value={formValues.location} onChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="occupation">Occupation</InputLabel>
                  <Input id="occupation" name='occupation' value={formValues.occupation} onChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input id="description" name='description' value={formValues.description} onChange={handleInputChange} />
                </FormControl>
              </Grid>

              <Grid item sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FormLabel>Account Information</FormLabel>

                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="register-name">Login Name</InputLabel>
                  <Input id="login-name" name='login_name' value={formValues.login_name} onChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" name='password' type='password' value={formValues.password} onChange={handleInputChange} />
                </FormControl>
                <FormControl variant="standard" sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <InputLabel htmlFor="registerPassword2">Type your password again</InputLabel>
                  <Input id="registerPassword2" name='registerPassword2' type='password' value={formValues.registerPassword2} onChange={handleInputChange} />
                </FormControl>

                {(formValues.password === formValues.registerPassword2) ?
                  (
                    <Typography style={{ color: "green" }}>
                      Passwords match!
                    </Typography>
                  ) : (
                    <Typography style={{ color: "red" }}>
                      Passwords do not match...
                    </Typography>
                  )}

              </Grid>

              {/* end of registration form */}

              <Button variant="contained" color="secondary" type="submit" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" noWrap >Sign Up!</Typography>
              </Button>

            </Grid>

          </form>
        </DialogContent>

      </Dialog>
    </div>

  );
}
export default RegisterNewUserForm;







