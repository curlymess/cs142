import React from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Typography, } from '@mui/material';
import './userList.css';
import { Link } from 'react-router-dom';
import Face2Icon from '@mui/icons-material/Face2';
import axios from 'axios';
/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.fetchData();

  }

  fetchData() {
    axios.get('user/list')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((e) => {
        console.log(e);
      });

  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (!this.state.users || prevProps !== this.props) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div>
        <Typography variant="h2" className='listTitle'>
          User List
        </Typography>

        {
          this.props.loggedInUser ?
            (
            <List component="nav">
              {this.state.users.map((user) => (
                <ListItem divider={true} key={user._id}>

                  <ListItemIcon sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    <Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>
                  </ListItemIcon>
                  <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={
                      (
                        <Typography variant="h4">
                          {`${user.first_name} ${user.last_name}`}
                        </Typography>
                      )
                    }
                    />
                  </Link>

                </ListItem>
              ))}
            </List>
            ) :
            <Typography variant="body1">you need an account to view!</Typography>
        }


      </div>
    );
  }
}

export default UserList;
