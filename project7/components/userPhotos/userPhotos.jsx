import React from 'react';
import { Grid, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, Divider, FormControlLabel, Checkbox, MobileStepper, Button, } from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import './userPhotos.css';
import { Link } from 'react-router-dom';
import Face2Icon from '@mui/icons-material/Face2';
import axios from 'axios';
/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			userPhotos: [],
			checked: false,
			step: 0,
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		axios(`/photosOfUser/${this.props.match.params.userId}`)
			.then((response) => {
				this.setState({ userPhotos: response.data });
			})
			.catch((e) => {
				console.log(e);
			});

		axios(`/user/${this.props.match.params.userId}`)
			.then((response) => {
				this.setState({ user: response.data });
			})
			.catch((e) => {
				console.log(e);
			});
	}

	handleToggle() {
		this.setState((prevState) => ({
			checked: !prevState.checked,
		}));
	}
	handleNext() {
		this.setState((prevState) => ({
			step: prevState.step + 1,
		}));
	}
	handleBack() {
		this.setState((prevState) => ({
			step: prevState.step - 1,
		}));
	}

	render() {
		return (
			<Grid className='photos-container'>
				<FormControlLabel control={<Checkbox checked={this.state.checked} onChange={this.handleToggle} />} label='Enable Advanced Features' className='checkbox' />

				{!this.state.checked ? (this.state.userPhotos.map((photo) => (
					// REGULAR PHOTO VIEWING 
					<Card key={photo._id} style={{ width: '600px' }}>
						<CardHeader
							avatar={(
								<Avatar sx={{ backgroundColor: "#DFFFD8" }}> 
									<Face2Icon sx={{ color: "#95BDFF" }} /> 
								</Avatar>
							)}
							title={`${this.state.user.first_name} ${this.state.user.last_name}`}
							subheader={photo.date_time}
							sx={{ backgroundColor: "#F7c8e0" }}
						/>

						<CardMedia component='img' height='auto' image={`/images/${photo.file_name}`} alt={photo._id} />

						{photo.comments ? photo.comments.map((comment) => (
							<Card key={comment._id} className='comment-section' sx={{backgroundColor:"#fbe3ef"}}> 
								<Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
									<CardHeader avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
										title={`${comment.user.first_name} ${comment.user.last_name}`}
										subheader={comment.date_time} />
								</Link>
								<CardContent sx={{backgroundColor: "#fdf1f7"}}>
									<Typography variant='body1'>{comment.comment}</Typography>
								</CardContent>
								<Divider />
							</Card>
						))
							: null}
					</Card>
					))
				) : ( // ADV FEAT DIV BEGIN 
					<div>
						{this.state.userPhotos.map((photo, index) => (
							<Card key={photo._id} style={{ width: '600px' }} >
								{Math.abs(this.state.step - index) < 1 ? (
									<div>
										<CardHeader avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
											title={`${this.state.user.first_name} ${this.state.user.last_name}`}
											subheader={photo.date_time} sx={{ backgroundColor: "#F7c8e0" }} />

										<CardMedia component='img' height='auto' image={`/images/${photo.file_name}`} alt={photo._id} />

										{photo.comments ? photo.comments.map((comment) => (
											<Card key={comment._id} className='comment-section' sx={{backgroundColor:"#fbe3ef"}}>
												<Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
													<CardHeader avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
														title={`${comment.user.first_name} ${comment.user.last_name}`}
														subheader={comment.date_time} 
													/>
												</Link>
												<CardContent sx={{backgroundColor:"#fdf1f7"}}>
													<Typography variant='body1'>{comment.comment}</Typography>
												</CardContent>
												<Divider />
											</Card>
										)) : null}
									</div>
								) : null}
							</Card>
						))}

						<MobileStepper
							steps={this.state.userPhotos.length}
							activeStep={this.state.step}
							position='static'
							nextButton={(
								<Button size='small' onClick={this.handleNext} disabled={this.state.step === this.state.userPhotos.length - 1}>
									{' '} Next <KeyboardArrowRight />
								</Button>
							)}
							backButton={(
								<Button size='small' onClick={this.handleBack} disabled={this.state.step === 0}><KeyboardArrowLeft /> Back
								</Button>
							)} />
					</div> // ADV FEAT DIV END
				)}
			</Grid>
		);
	}
}

export default UserPhotos;
