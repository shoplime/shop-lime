import React, { Component } from 'react'
import PropTypes from 'prop-types';

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

  
  render() {

    function check_Email(mail){
      var regex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
      if(regex.test(mail.myemail.value)){
        return true;
        alert("Congrats! This is a valid Email email");
      }
      else{
        alert("This is not a valid email address");
        return false;
      }
    }
        
    const { classes } = this.props;
    return (
      <div>
       <TextField
        id="outlined-dense"
        label="Event Name"
        className={classNames(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        onBlur="check_Email"
       />
      </div>
    )
  }
}

EventName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventName);