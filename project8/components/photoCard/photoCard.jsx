import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardHeader, CardMedia, CardActions,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Typography, MobileStepper, Button, IconButton,
    Menu, MenuItem
} from '@mui/material';

import { enqueueSnackbar } from 'notistack';

import './photoCard.css';

// icons
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import Face2Icon from '@mui/icons-material/Face2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import axios from 'axios';
import NewComment from '../userPhotos/NewComment';

function convertTime(time) {
    let pos = time.indexOf('.');
    let replaced = time.replace(/[A-Z]/g, function () {
        return " ";
    });
    return replaced.slice(0, pos);
}

class PhotoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFav: false,
            likeList: [],
            anchorEl: null,
        };
        this.source = axios.CancelToken.source();
        this.fetchLikes();
    }

    fetchLikes() {
        axios(`/likes/${this.props.photo._id}`, { cancelToken: this.source.token })
            .then((response) => {
                const list = response.data;
                this.setState({
                    likeList: list,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.fetchLikes();
        this.setState({
            isFav: this.props.isFav,
            anchorEl: false,
        });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFav !== this.props.isFav) {
            this.setState({
                isFav: this.props.isFav,
                anchorEl: false,
            });
        }
        if (prevProps.photo._id !== this.props.photo._id) {
            this.fetchLikes();
            this.setState({
                anchorEl: false,
            });
        }
    }

    handleBookmarkClick = () => {
        let photo = this.props.photo;
        if (this.state.isFav) {
            axios.delete(`/favorite/${photo._id}`, {})
                .then(() => {
                    this.setState({
                        isFav: false,
                    });
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        } else {
            axios.post(`/favorite/${photo._id}`)
                .then(response => {
                    this.setState({
                        isFav: true,
                    });
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        }
    };

    handleLikeClick(event) {
        event.preventDefault();
        let photo = this.props.photo;
        axios.post(`/likes/${photo._id}`, {})
            .then(() => {
                this.fetchLikes();
            })
            .catch(error => {
                console.log("like/unlike failed: " + error.response.data);
                enqueueSnackbar("error with liking post, try again later :/", { variant: 'error' });
            });
    }

    handleDeleteCommentClick(event, commentIndex) {
        event.preventDefault();
        let photo = this.props.photo;
        axios.post("delete/comment", { commentIndex: commentIndex, photoId: photo._id })
            .then(() => {
                enqueueSnackbar("successfully deleted comment!", { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar("error with deleting comment :/", { variant: 'error' });
            });
    }

    // photo settings // delete photo
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleCloseDelete = () => {
        this.setState({ anchorEl: null });
        // event.preventDefault();

        axios.post("delete/photo", { photo_id: this.props.photo._id })
            .then(() => {
                enqueueSnackbar("successfully deleted photo!", { variant: 'success' });
            })
            .catch(error => {
                console.error("delete photo failed: " + error);
                enqueueSnackbar("error with deleting photo :/", { variant: 'error' });
            });

    };

    showCards() {
        const photo = this.props.photo;
        const user = this.props.user;
        const step = this.props.step;
        const userPhotosLength = this.props.userPhotos.length;
        const index = this.props.userPhotoIndex;
        const timeToConvert = this.props.photo.date_time;
        return (
            <Card style={{ maxHeight: 650, width: 600, margin: 'auto' }}>
                {Math.abs(step - index) < 1 ? (
                    // start of card
                    <div>
                        {/* poster */}
                        <CardHeader
                            avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
                            title={(
                                <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
                                    <Typography variant="h4">{`${user.first_name} ${user.last_name}`}</Typography>
                                </Link>
                            )}
                            subheader={(
                                <Typography variant="h7">
                                    {`${convertTime(timeToConvert)}`}
                                </Typography>
                            )}
                            action={
                                user._id === this.props.loggedInUserId ?
                                    (
                                        <div>
                                            <IconButton aria-label="settings" onClick={this.handleMenu}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={this.state.anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(this.state.anchorEl)}
                                                onClose={this.handleClose}
                                            >
                                                <MenuItem onClick={this.handleCloseDelete}>Delete Image</MenuItem>
                                            </Menu>
                                        </div>
                                    ) : null
                            }
                            sx={{ backgroundColor: "#F7c8e0" }} />
                        {/* image */}
                        <CardMedia component='img' image={`/images/${photo.file_name}`} alt={photo._id} style={{ height: 300, objectFit: 'contain' }} />
                        {/* scroll images */}
                        <MobileStepper
                            steps={userPhotosLength}
                            activeStep={step}
                            position='static'
                            nextButton={(
                                <Button size='small' onClick={this.props.handleNext} disabled={step === userPhotosLength - 1}>
                                    {' '} Next <KeyboardArrowRight />
                                </Button>
                            )}
                            backButton={(
                                <Button size='small' onClick={this.props.handleBack} disabled={step === 0}><KeyboardArrowLeft /> Back
                                </Button>
                            )} />

                        {/* action bar */}
                        <CardActions sx={{ display: "flex", justifyContent: "space-between", flexDirection: 'row' }}>
                            <div className='bttnRow'>
                                <IconButton onClick={event => this.handleLikeClick(event)}>
                                    {this.state.likeList.includes(this.props.loggedInUserId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <Typography>
                                    {this.state.likeList.length} likes
                                </Typography>
                            </div>
                            <div className='bttnRow'>
                                <IconButton onClick={this.handleBookmarkClick}>
                                    {this.state.isFav ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                                <NewComment currPhotoId={photo._id} currPhotoFileName={photo.file_name} currUser={user.first_name + ' ' + user.last_name} />
                            </div>
                        </CardActions>

                        {/* the comments */}
                        {photo.comments ?
                            // comment section
                            (
                                <div>
                                    <Typography variant='h4' sx={{ paddingLeft: "5px" }}>Comment Section</Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 150, }} >
                                        {photo.comments.map((comment, commentIndex) => (
                                            <ListItem divider={true} key={comment._id} sx={{ backgroundColor: "#fbe3ef", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <div className='trashDiv'>
                                                    <div className='commentHeader'>
                                                        <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
                                                            <ListItemAvatar sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                                                <Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>
                                                            </ListItemAvatar>
                                                        </Link>
                                                        <ListItemText primary={(
                                                            <div>
                                                                <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
                                                                    <Typography variant="h4">{`${comment.user.first_name} ${comment.user.last_name}`}</Typography>
                                                                </Link>
                                                                <Typography variant="h7">{`${convertTime(timeToConvert)}`}</Typography>
                                                            </div>
                                                        )} />
                                                    </div>
                                                    {comment.user._id === this.props.loggedInUserId ?
                                                        (
                                                            <IconButton className='trashIcon' onClick={event => this.handleDeleteCommentClick(event, commentIndex)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        ) : null}
                                                </div>
                                                <Typography variant="body1">{comment.comment}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            ) : ( // TO-DO: find out why this won't show when there are no comments
                                <Typography variant="body1" > no comments </Typography>
                            )}
                        {/* end of comment section */}
                    </div>
                    // end of card
                ) : null}

            </Card>
        );
    }

    render() {
        return (
            <div>
                {
                    this.showCards()
                }
            </div>
        ); // end of return
    } // end of render
}

export default PhotoCard;
