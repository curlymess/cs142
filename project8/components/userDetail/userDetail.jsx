import React from 'react';
import {  Button, Typography } from '@mui/material';
import './userDetail.css';

//icons
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
constructor(props) {
		super(props);
		this.state = {
			user: '',
		};
		this.source = axios.CancelToken.source();
	}

	componentDidMount(){
		if(this.props.match.params.userId){
			axios.get('/user/'+this.props.match.params.userId, { cancelToken: this.source.token })
			.then((response) => {
				this.setState({ user: response.data });
				this.props.handler(response.data.first_name + " " + response.data.last_name);
			})
			.catch((e) => {
				console.log("in userdetail: " + e);
			});
		}
	}

	componentDidUpdate(prev) {
		if ( prev !== this.props ){
			axios.get('/user/'+this.props.match.params.userId, { cancelToken: this.source.token })
			.then((response) => {
				this.setState({ user: response.data });
				this.props.handler(response.data.first_name + " " + response.data.last_name);
			})
			.catch((e) => {
				console.log("in userdetail: " + e);
			});
		}
	}

	componentWillUnmount() {
		this.source.cancel("user cancelled req in userDetail");
	  }

	render() {
		return (
			<div className='container'>
				<h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
				
				<div className='info-box'>
					<StarIcon color="third" />
					<div className='info-text'>
						<p>Description</p>
						<p className='status'>{this.state.user.description}</p>
					</div>
				</div>

				<div className='info-box'>
					<WorkIcon color="third" />
					<div className='info-text'>
						<p>Work</p>
						<p className='status'>{this.state.user.occupation}</p>
					</div>
				</div>
				
				<div className='info-box'>
					<LocationOnIcon color="third" />
					<div className='info-text'>
						<p>Location</p>
						<p className='status'>{this.state.user.location}</p>
					</div>
				</div>
				<Link to={`/photos/${this.state.user._id}`} className='button' style={{ textDecoration: 'none',  }}>
					<Button variant='contained' color='secondary' disableElevation>
						<PhotoLibraryIcon color="third"  sx={{paddingRight: "5px"}}/>
						<Typography variant='h6' noWrap>
							View Photos
						</Typography>
					</Button>
				</Link>
			</div>
		);
	}
}

export default UserDetail;