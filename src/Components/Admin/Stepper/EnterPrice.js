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

class AddProduct extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
       <TextField
        id="outlined-dense"
        label="Enter Price"
        className={classNames(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
       />
      </div>
    )
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);