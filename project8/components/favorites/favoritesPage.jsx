import React from 'react';
import {
    Typography, List,
    //ImageList, ImageListItem,
} from '@mui/material';

// icons


import axios from 'axios';

class FavoritesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: null,
            fileName: "",
            loginId: "",
            message: "",
        };

    }

    componentDidMount() {
        if (this.props.loggedInUser) {
            console.log("loggedInUSer mounted: " + this.props.loggedInUser);
        }
        this.fetchData();
    }

    fetchData() {
        axios.get(`/favorites`).then(response => {
            console.log("response fata her is " + response.data);
            this.setState({
                favorites: response.data,
            });
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    displayFavoriteList() {
        if (this.state.favorites === null) {
            return null;
        } else if (this.state.favorites.length === 0) {
            return (
                <Typography variant="body2" color="textPrimary">
                    no favorites yet
                </Typography>
            );
        }
        return this.state.favorites.map((photo, index) => {
            return (
                <div key={index}>
                    <ListItem>
                        <Avatar
                            alt={photo.file_name}
                            src={"../../images/" + photo.file_name}
                            onClick={() => {
                                this.openModal(photo.file_name, photo.date_time, photo.user_id);
                            }}
                        />
                        <Typography variant="body2" color="inherit" style={{ marginLeft: "10px" }}>
                            {photo.file_name}
                        </Typography>
                        <IconButton
                            aria-label="Delete favorites"
                        //   onClick = {() => {
                        //     this.handleDeleteBtn(photo);
                        //   }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    <Divider />
                </div>
            );
        });
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

            <div>
                <Typography>this is your fav page</Typography>

                <List component="nav">
                    {this.displayFavoriteList()}
                </List>
            </div>
        );
    }
}

export default FavoritesPage;