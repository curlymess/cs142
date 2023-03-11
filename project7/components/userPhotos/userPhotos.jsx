import React from 'react';
import { Link } from 'react-router-dom';

import {
	Grid, Card, CardHeader, CardMedia, CardContent, CardActions,
	List, ListItem, ListItemText, ListItemAvatar, ListItemIcon,
	Avatar, Typography, Divider, FormControlLabel, Checkbox, MobileStepper, Button,
	Collapse
} from '@mui/material';

import './userPhotos.css';
import NewComment from '../newComment/NewComment'

import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import Face2Icon from '@mui/icons-material/Face2';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
		this.handleBack = this.handleBack.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.source = axios.CancelToken.source();
	}

	componentDidMount() {
		if(this.props.match.params.userId){
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
		}
	}

	componentWillUnmount() {
		this.source.cancel("cancelled by user in userphotos");
	  }


	// for mobilestepper
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
			<Grid>
				{(this.state.userPhotos.map(
					(photo, index) => (
					<Grid item key={photo._id} >
						<Card >
							{Math.abs(this.state.step - index) < 1 ? (

								// start of card
								<div> 
									{/* poster */}
									<CardHeader
										avatar={(<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>)}
										title={`${this.state.user.first_name} ${this.state.user.last_name}`}
										subheader={photo.date_time} sx={{ backgroundColor: "#F7c8e0" }} />
									{/* image */}
									<CardMedia component='img' image={`/images/${photo.file_name}`} alt={photo._id} />
									{/* scroll images */}
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
									{/* action bar */}
									<CardActions sx={{display: "flex", justifyContent: "space-between"}}>
										<Button size="small"><FavoriteIcon /></Button>
										<NewComment currPhotoId={photo._id}/>
									</CardActions>
									{/* the comments */}
									{photo.comments ? 
										// comment section
										<div>
											<Typography variant='h4' sx={{paddingLeft: "5px"}}>Comment Section</Typography>
											<List 
												sx={{
													width: '100%',
													bgcolor: 'background.paper',
													position: 'relative',
													overflow: 'auto',
													maxHeight: 200,
												}}
											>
												{photo.comments.map((comment) => (
													<ListItem divider={true} key={comment._id} className='comment-section' sx={{ backgroundColor: "#fbe3ef" }}>
														
														<Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
															<ListItemAvatar sx={{display: { xs: 'none', sm:'flex'}}}>
																<Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>
															</ListItemAvatar>
														</Link>
														<ListItemText primary={(
																		<Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
																		<Typography variant="h4">{`${comment.user.first_name} ${comment.user.last_name}`}</Typography>
																		</Link>
																		)}
																	secondary={(<Typography variant="body1">{comment.comment}</Typography>)}/>
													</ListItem>
												)) }
											</List>
										</div>
										
									:  null	}
									{/* end of comment section */}
							</div>
							// end of card

							) : null}

						</Card>
					</Grid>


					)))}
			</Grid>
		); // end of return
	} // end of render
}

export default UserPhotos;
