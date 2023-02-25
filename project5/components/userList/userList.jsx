import React from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Typography, } from '@mui/material';
import './userList.css';
import { Link } from 'react-router-dom';
import Face2Icon from '@mui/icons-material/Face2';
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
        <Typography variant="h5" className='listTitle' fontFamily={"Itim"} fontWeight={700}>
          User List
        </Typography>

        <List component="nav">
          {this.state.users.map((user) => (
            <ListItem divider={true} key={user._id}>

              <ListItemIcon>
                <Avatar sx={{ backgroundColor: "#DFFFD8" }}> <Face2Icon sx={{ color: "#95BDFF" }} /> </Avatar>
              </ListItemIcon>

              <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
                <ListItemText primary={
                  <Typography variant="h7" fontFamily={"Itim"} fontWeight={700}>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                } />
              </Link>

            </ListItem>
          ))}
        </List>

      </div>
    );
  }
}

export default UserList;
