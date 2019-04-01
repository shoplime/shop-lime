import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

  class EventName extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
      };
      
  }



  

  
  render() {
    const { classes, handleChangeFn } = this.props;
    return (
      <div>
       <TextField
        id="outlined-dense"
        label="Event Name"
        className={classNames(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        onChange={(e)=> handleChangeFn('name', e.target.value)}
       />
      </div>
    )
  }
}

EventName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventName);