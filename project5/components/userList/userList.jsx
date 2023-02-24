import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
}
from '@mui/material';
import './userList.css';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    console.log('window.cs142models.userListModel()', window.cs142models.userListModel());
    
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetchModel('/user/list')
			.then((response) => {
				this.setState({ users: response.data });
			})
			.catch((e) => {
				console.log(e);
			});
  }
 
  render() {
    return (
      <div>
        <Typography variant="body1">
          User List
        </Typography>

        <List component="nav">
          {this.state.users.map((user) => (
              <ListItem divider={true} key={user._id}>
                
                <ListItemAvatar>
                  <Avatar> </Avatar>
                </ListItemAvatar>
                
                <Link to={`/users/${user._id}`} style={{ textDecoration: 'none'}}> 
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {`${user.first_name} ${user.last_name}`}
                      </Typography>
                    }/>
                </Link>
              
              </ListItem>
          ))}
        </List>


        <Typography variant="body1">
          text after list
        </Typography>
      </div>
    );
  }
}

export default UserList;
