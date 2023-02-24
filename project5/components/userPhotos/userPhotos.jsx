import React from 'react';
import {
  
  Grid, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, Divider, FormControlLabel, Checkbox, MobileStepper, Button,
} from '@mui/material';
import './userPhotos.css';
import fetchModel from '../../lib/fetchModelData';
import { Link } from 'react-router-dom';
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
		// this.handleToggle = this.handleToggle.bind(this);
		// this.handleBack = this.handleBack.bind(this);
		// this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		fetchModel(`/photosOfUser/${this.props.match.params.userId}`)
			.then((response) => {
				this.setState({ userPhotos: response.data });
			})
			.catch((e) => {
				console.log(e);
			});

		fetchModel(`/user/${this.props.match.params.userId}`)
			.then((response) => {
				this.setState({ user: response.data });
			})
			.catch((e) => {
				console.log(e);
			});
	}

  render() {
    return (
      <Grid className='photos-container'>
			
					<div>
						{this.state.userPhotos.map((photo, index) => (
							<Card key={photo._id} style={{ width: '560px' }}>
								{Math.abs(this.state.step - index) < 1 ? (
									<div>
										<CardHeader
											avatar={( <Avatar style={{  }}> </Avatar>  )}
											title={`${this.state.user.first_name} ${this.state.user.last_name}`}
											subheader={photo.date_time}
										/>

										<CardMedia component='img' height='auto' image={`/images/${photo.file_name}`} alt={photo._id} />
										{photo.comments
											? photo.comments.map((comment) => (
													<Card key={comment._id} className='comment-section'>
														<Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none' }}>
															<CardHeader
																avatar={(
                                                   <Avatar style={{ background: 'transparent' }}>
                                                   </Avatar>
                                                )}
																title={`${comment.user.first_name} ${comment.user.last_name}`}
																subheader={comment.date_time}
															/>
														</Link>
														<CardContent className='comment'>
															<Typography variant='body2'>{comment.comment}</Typography>
														</CardContent>
														<Divider />
													</Card>
											  ))
											: null}
                      
									</div>
								) : null}
							</Card>
						))}
						
					</div>
				
			</Grid>
		);
	}
}

export default UserPhotos;
