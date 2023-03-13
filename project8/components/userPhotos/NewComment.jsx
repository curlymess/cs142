import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Face2Icon from '@mui/icons-material/Face2';
import { Button, AppBar, Toolbar, IconButton, Typography,
  CardMedia, CardHeader, Card, Avatar, 
  DialogContent, Dialog, DialogActions, TextField} from '@mui/material';
import axios from 'axios';

export default function NewComment(props) {
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setNewComment(event.target.value);
  };

  const handlePostComment = () =>{
    setOpen(false);
    const formData = new FormData();
    formData.append('comment', newComment);

    axios.post(`/commentsOfPhoto/${props.currPhotoId}`, formData)
    .catch(err => {
        console.log(err);
        setNewComment('');
    });

    
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
           <AddCommentIcon />
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
              Add New Comment
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Card>
              <CardHeader
                    avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
                    title={<Typography variant="h4">{`${props.currUser}`}</Typography>}
                    sx={{ backgroundColor: "#F7c8e0" }} />
                {/* image */}
                <CardMedia component='img'
                    sx={{
                        overflow: 'hidden',
                        maxHeight: '400px',
                        width: 'auto',
                    }}
                    image={`/images/${props.currPhotoFileName}`} />
          </Card>

            <TextField
              autoFocus
              margin="dense"
              id="newCommentText"
              label="Type your comment"
              fullWidth
              variant="standard"
              value={newComment}
              onChange={handleInputChange}
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="inherit" onClick={handlePostComment}>
              Post Comment
          </Button>
        </DialogActions>
        

              
      </Dialog>
    </div>
  );
}