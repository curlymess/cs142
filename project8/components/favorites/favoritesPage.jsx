import React from 'react';
import {
    Typography, List, ListItem, Avatar, IconButton, Divider, Button,
    ImageList, ImageListItem, ImageListItemBar, ListSubheader,
    Modal, Box
} from '@mui/material';

import { Link } from "react-router-dom";

// icons
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import InfoIcon from '@mui/icons-material/Info';

import axios from 'axios';

class FavoritesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: null,
            fileName: "",
            fileId: "",
            dateTime: "",
            isOpen: false,
        };

        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
        // Modal.setAppElement('body');
        if (this.props.loggedInUser) {
            console.log("loggedInUser mounted: " + this.props.loggedInUser);
        }
        this.fetchData();
    }

    handleOpen = (fileName, dateTime, fileId) => {
        this.setState({
            isOpen: true,
            fileName: fileName,
            dateTime: dateTime,
            fileId: fileId,
        });
    };

    handleClose = () => {
        this.setState({
            isOpen: false,
        });
    };


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

    // TO-DO: add more alerts

    removeBookmarkClick = (photo) => {
        axios.delete(`/favorite/${photo._id}`).then(response => {
            console.log(response.data);
            this.fetchData();
            alert("successfully delete photo");
        }).catch(error => {
            alert("failed to delete photo");
            console.log(error.response.data);
        });
    };

    displayFavList() {
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
                <ImageListItem key={photo._id}>
                    <img
                        alt={photo.file_name}
                        loading="lazy"
                        src={"../../images/" + photo.file_name + "?w=164&h=164&fit=crop&auto=format"}
                        srcSet={"../../images/" + photo.file_name + `?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        onClick={() => {
                            this.handleOpen(photo.file_name, photo.date_time, photo.user_id);
                        }}
                    />

                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        position="top"
                        actionIcon={
                            <IconButton
                                sx={{ color: 'white' }}
                                aria-label={`BookMarkRemoveIcon ${photo.file_name}`}
                                // onClick={this.removeBookmarkClick(photo)}
                            >
                                <BookmarkRemoveIcon />
                            </IconButton>
                        }
                        actionPosition="left"
                    />

                    <ImageListItemBar
                        title={photo.file_name}
                        subtitle={"posted " + photo.date_time}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${photo.file_name}`}
                                onClick={() => {
                                    this.handleOpen(photo.file_name, photo.date_time, photo.user_id);
                                }}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
                // <Divider />
            );
        });
    }

    render() {
        console.log("here in fav");
        return (
            <div>
                <Typography variant="h2">Your Bookmarked Pictures</Typography>

                <ImageList component="nav" sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {this.displayFavList()}
                </ImageList>

                <Modal
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                >
                    <Box>
                        <Typography>hi</Typography>
                    </Box>

                </Modal>
            </div>
        );
    }
}

export default FavoritesPage;