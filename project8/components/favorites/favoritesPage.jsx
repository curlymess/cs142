import React from 'react';
import {
    Typography,
    //ImageList, ImageListItem,
} from '@mui/material';

// icons


// import axios from 'axios';

class favoritesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_name: '',
            password: '',
        };

    }


    render() {
        console.log("here in fav");
        return (
            //   <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            //     {itemData.map((item) => (
            //       <ImageListItem key={item.img}>
            //         <img
            //           src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            //           srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            //           alt={item.title}
            //           loading="lazy"
            //         />
            //       </ImageListItem>
            //     ))}
            //   </ImageList>

            <Typography>this is your fav page</Typography>
        );
    }


}

export default favoritesPage;