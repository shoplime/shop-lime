import React, { useState, useEffect, Suspense, memo } from 'react'
import tileData from './TileData';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Videos.scss'

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
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="space-between" spacing={Number(spacing)}>
                        {tileData.map((tile, index) => (
                                <div>
                                    <button className='video-card'>
    
                                    </button>
                                        <p>{tile.author}</p>
                                </div>
                                    
                            
                            
                            
                            // <Grid key={index} item>
                            //     <Paper className={classes.paper}>
                            //         <img src={tile.img} alt=""/>
                            //     </Paper>
                            //         <p>{tile.author}</p>
                            //         <p>{tile.title}</p>
                                
                            // </Grid>
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