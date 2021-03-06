import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CartCounter from '../Checkout/Cart/CartCounter'
import {Link} from 'react-router-dom'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function TextButtons(props) {
  const { classes, user } = props;
  return (
    <div>
      {
        !user
        ?
          // <Button onClick={() => { handleOpen(true); handleError('') }} className={classes.button}>
          //   Login
          // </Button>
          <></>
        :
          <Button className={classes.button}>
            <Link to='/cart' style={{ textDecoration: 'none', color: '#388e3c'}}><CartCounter/></Link>
          </Button>  
      }
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);