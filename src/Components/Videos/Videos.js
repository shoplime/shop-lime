import React, { useState, useEffect, Suspense, memo } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './Videos.scss'
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'
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
        videos: [],
        product_id: ''
    };
    getVideos = () => {
        // axios.get
    }
    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };
    handleClick = (stream) => {
        this.props.history.push(`/${stream.product_id}/${stream.archive_id}/${stream.name}`)
        window.scrollTo(0, 0)
        
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
                                    <div >
                                        {/* <Link to = {stream.product_id +'/'+ stream.archive_id}> */}
                                            <button onClick={() => this.handleClick(stream)} className='video-card'>
                                             <img className='img' src={stream.url} alt=''/> 
                                             </button>
                                        <div className='video-details'>
                                                <p>{stream.name}</p>
                                        </div>
                                    </div>
                                    :
                                        <div >
                                            <button onClick={() => { handleOpen(true); handleError('') }} className='video-card'>
                                            <img src={stream.url} alt='' />
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

export default withStyles(styles)(withRouter(Videos));