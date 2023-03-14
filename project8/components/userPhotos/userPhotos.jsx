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


import axios from 'axios';
import NewComment from './NewComment';
import PhotoCard from './photoCard';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			userPhotos: [],
			step: 0,
			favorites: [],
		};
		this.handleBack = this.handleBack.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.source = axios.CancelToken.source();

	}

	componentDidMount() {
		if (this.props.match.params.userId) {
			axios(`/photosOfUser/${this.props.match.params.userId}`, { cancelToken: this.source.token })
				.then((response) => {
					this.setState({ userPhotos: response.data });
				})
				.catch((e) => {
					console.log(e);
				});

			axios(`/user/${this.props.match.params.userId}`, { cancelToken: this.source.token })
				.then((response) => {
					this.setState({ user: response.data });
				})
				.catch((e) => {
					console.log(e);
				});

			axios(`/favorites/`, { cancelToken: this.source.token })
				.then((response) => {
					console.log("retrieved fav and here theya re : " + response.data);
					this.setState({ favorites: response.data });
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}

	// for new comments to be displayed
	componentDidUpdate() {
		axios(`/photosOfUser/${this.props.match.params.userId}`, { cancelToken: this.source.token })
			.then((response) => {
				this.setState({ userPhotos: response.data });
			})
			.catch((e) => {
				console.log(e);
			});
	}
	componentWillUnmount() {
		this.source.cancel("cancelled by user in userphotos");
	}
	// for mobilestepper
	handleNext() { this.setState((prevState) => ({ step: prevState.step + 1 })); }

	handleBack() { this.setState((prevState) => ({ step: prevState.step - 1 })); }

	// for favorite / bookmarking
	updateFav = () => {
		console.log("in updatefac");
		axios.get(`/favorites`).then(response => {
			this.setState({
				favorites: response.data,
			});
		}).catch(error => {
			console.log(error.response.data);
		});
	}

	render() {
		return (
			this.state.userPhotos ?
				this.state.userPhotos.map((photo, index) => {
					let isFav = false;
					for (let i = 0; i < this.state.favorites.length; i++) {
						if (this.state.favorites[i]._id === photo._id) {
							isFav = true;
							break;
						}
					}
					return (
						<PhotoCard key={photo._id} userPhotoIndex={index} isFav={isFav}
							handleBack={this.handleBack} handleNext={this.handleNext} step={this.state.step}
							photo={photo} user={this.state.user} userPhotos={this.state.userPhotos}
						/>
					);

				}) : null

		); // end of return
	} // end of render
}

export default UserPhotos;
