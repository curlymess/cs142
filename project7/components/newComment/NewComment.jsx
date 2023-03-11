import React from 'react';
import {
    Button, Typography,
} from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function NewComment(props){

return(
       	<Button>
           <AddCommentIcon />
           <Typography> Add Comment</Typography>
        </Button>
        


);
}