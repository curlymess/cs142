import React from 'react';
import {  Button } from '@mui/material';
import './userDetail.css';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
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
			<div className='container'>
				<h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
				
				<div className='info-box'>
					<p>Description</p>
					<p className='status'>{this.state.user.description}</p>
				</div>

				<div className='info-box'>
					<p>Work</p>
					<p className='status'>{this.state.user.occupation}</p>
				</div>
				
				<div className='info-box'>
					<p>Location</p>
					<p className='status'>{this.state.user.location}</p>
				</div>
				<Link to={`/photos/${this.state.user._id}`} className='button' style={{ textDecoration: 'none' }}>
					<Button variant='contained' color='primary' disableElevation>
						View Photos
					</Button>
				</Link>
			</div>
		);
	}
}

export default UserDetail;