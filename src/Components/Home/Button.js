import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Authentication from '../Authentication/Authentication'

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    
  },
});

function TextButtons(props) {
  const { classes, handleOpen, handleError } = props;
  return (
    <div style={{marginLeft: 'auto'}}>
          <Button onClick={() => { handleOpen(true); handleError('') }} className={classes.button}>
        Login
      </Button>
      
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);