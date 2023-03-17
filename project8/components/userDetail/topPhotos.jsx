import React from 'react';
import {
    Typography, IconButton, Button,
    ImageList, ImageListItem, ImageListItemBar,
    Modal, Box
} from '@mui/material';

import axios from 'axios';

class TopPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostComment: null,
            mostRecent: null,
            loading1: true,
            loading2: true,
        };
    }

    componentDidMount() {
        this.fetchMostComment();
        this.fetchMostRecent();
    }

    fetchMostComment() {
        axios.get(`/most-comment`).then(response => {
            this.setState({
                mostComment: response.data,
                loading1: false,
            });
        }).catch(error => {
            console.log("failed to get most comment");
            console.log(error.response.data);
        });
    }

    fetchMostRecent() {
        axios.get(`/most-recent`).then(response => {
            this.setState({
                mostRecent: response.data,
                loading2: false,
            });
        }).catch(error => {
            console.log("failed to get most recent");
            console.log(error.response.data);
        });
    }

    convertTime(time) {
        let pos = time.indexOf('.');
        let replaced = time.replace(/[A-Z]/g, function () {
            return " ";
        });
        return replaced.slice(0, pos);
    }

    render() {
        return (
            (!this.state.loading1 && !this.state.loading2) ? (
                <ImageList component="nav" sx={{ width: 400, height: 200 }} cols={2} rowHeight={200}>
                    <ImageListItem key={this.state.mostRecent._id + 1}>
                        <img
                            alt={this.state.mostRecent.file_name}
                            loading="lazy"
                            src={"../../images/" + this.state.mostRecent.file_name + "?w=200&h=200&fit=crop&auto=format"}
                            srcSet={"../../images/" + this.state.mostRecent.file_name + `?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                        />
                        
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            position="top"
                            title="Most Recent"

                            actionPosition="left"
                        />
                        <ImageListItemBar
                            title={this.state.mostRecent.file_name}
                            subtitle={"posted " + this.convertTime(this.state.mostRecent.date_time)}
                        />
                    </ImageListItem>

                    <ImageListItem key={this.state.mostComment._id}>
                        <img
                            alt={this.state.mostComment.file_name}
                            loading="lazy"
                            src={"../../images/" + this.state.mostComment.file_name + "?w=200&h=200&fit=crop&auto=format"}
                            srcSet={"../../images/" + this.state.mostComment.file_name + `?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                        />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            position="top"
                            title="Most Commented"

                            actionPosition="left"
                        />
                        <ImageListItemBar
                            title={this.state.mostComment.file_name}
                            subtitle={this.state.mostComment.comments.length + " comments "}
                        />
                    </ImageListItem>

                </ImageList>
            ) : (
                <div><Typography>nothing</Typography></div>
            )
        );
    }
}

export default TopPhotos;