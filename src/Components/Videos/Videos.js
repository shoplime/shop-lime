import React, { useState, useEffect, Suspense, memo } from 'react'
import tileData from './TileData';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Videos.scss'
import { userInfo } from 'os';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 190,
        width: 150,
    },
    control: {
        padding: theme.spacing.unit * 3,
    },
});

class Videos extends React.Component { 
    state = {
        spacing: '16',
        videos: []
    };
    getVideos = () => {
        // axios.get
    }
    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };
    handleClick = () => {

    }
    
    

    render() {
        const { classes, user, handleOpen, handleError, pastStreams } = this.props;
        const { spacing } = this.state;
        

        return (
            
            <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="space-between" spacing={Number(spacing)}>
                            {pastStreams.map((stream, index) => (
                                <div key={index}>              
                                {
                                        user
                                        ?
                                        <div>
                                            <button className='video-card'>
                                            </button>
                                            <div className='video-details'>
                                                 <p>{stream.name}</p>

                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <button onClick={() => { handleOpen(true); handleError('')}} className='video-card'>
                                            </button>
                                            <div className='video-details'>
                                                 <p>{stream.name}</p>

                                            </div>
                                        </div>
                                    }

                                    </div>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
        );
    }
}

Videos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Videos);