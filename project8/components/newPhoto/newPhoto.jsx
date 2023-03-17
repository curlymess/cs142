import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

import { enqueueSnackbar } from 'notistack';
import axios from 'axios';

export default function NewPhoto() {
  const [open, setOpen] = React.useState(false);
  const [uploadInput, setUploadInput] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);

    if (uploadInput) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', uploadInput);
      axios.post('/photos/new', domForm)
        .then(() => {
          enqueueSnackbar("photo uploaded!", {variant: 'success'});
        })
        .catch(err => {
          console.log("uploading error:" + err);
          enqueueSnackbar("error with uploading photo :/", { variant: 'error' });
        });
    }
  };

  const handleChange = (e) => {
    setUploadInput(e.target.files[0]);
  };

  return (
    <div>
      <IconButton color="secondary" aria-label="upload picture" onClick={handleClickOpen} >
        <UploadIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select your new photo
          </DialogContentText>
          <input type="file" accept="image/*" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Upload New Photo!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}