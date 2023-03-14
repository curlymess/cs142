import React from 'react';
import { Link } from 'react-router-dom';

import {
    Grid, Card, CardHeader, CardMedia, CardActions,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Typography, MobileStepper, Button,
} from '@mui/material';

import './userPhotos.css';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import Face2Icon from '@mui/icons-material/Face2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


import NewComment from './NewComment';

import axios from 'axios';

class PhotoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFav: false,
        };

    }

    componentDidMount() {
        this.setState({
            isFav: this.props.isFav,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFav !== this.props.isFav) {
            this.setState({
                isFav: this.props.isFav,
            });
        }
    }

    convertTime(time) {
        let pos = time.indexOf('.');
        let replaced = time.replace(/[A-Z]/g, function () {
            return " ";
        });
        return replaced.slice(0, pos);
    }

    handleFavoriteClick= () => {
        let photo = this.props.photo;
        if (this.state.isFav) {
            axios.delete(`/favorite/${photo._id}`, {})
                .then(response => {
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

    showCards() {
        const photo = this.props.photo;
        const user = this.props.user;
        const step = this.props.step;
        const userPhotosLength = this.props.userPhotos.length;
        const index = this.props.userPhotoIndex;
        // userPhotos
        return (
            <Card style={{maxWidth: "600px"}}>
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
                                    {`${this.convertTime(photo.date_time)}`}
                                </Typography>
                            )}
                            sx={{ backgroundColor: "#F7c8e0" }} />
                        {/* image */}
                        <CardMedia component='img' image={`/images/${photo.file_name}`} alt={photo._id}  style={{ maxHeight: "300px", width: "auto", height: "auto" }}/>
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
                        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                            { this.state.isFav ?
                                <Button size="small" >
                                    <BookmarkIcon onClick={this.handleFavoriteClick} />
                                </Button>
                                :
                                <Button size="small" onClick={this.handleFavoriteClick}>
                                    <BookmarkBorderIcon />
                                </Button>
                            }
                            <NewComment currPhotoId={photo._id} currPhotoFileName={photo.file_name} currUser={user.first_name + ' ' + user.last_name} />
                        </CardActions>

                        {/* the comments */}
                        {photo.comments ?
                            // comment section
                            (
                                <div>
                                    <Typography variant='h4' sx={{ paddingLeft: "5px" }}>Comment Section</Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 200, }} >
                                        {photo.comments.map((comment) => (
                                            <ListItem divider={true} key={comment._id} className='comment-section' sx={{ backgroundColor: "#fbe3ef", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <div className="commentHeader">
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
                                                            <Typography variant="h7">{`${this.convertTime(photo.date_time)}`}</Typography>
                                                        </div>
                                                    )} />
                                                </div>
                                                <Typography variant="body1">{comment.comment}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            ) :
                            <Typography variant="body1" >
                                no comments
                            </Typography>
                        }
                        {/* end of comment section */}
                    </div>
                    // end of card
                ) : null}

            </Card>
        )
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
