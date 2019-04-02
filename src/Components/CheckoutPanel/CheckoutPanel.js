import React, { useState, Suspense, useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Cart from '../Checkout/Cart/Cart';
import Complete from '../Checkout/Checkout/stepper/Complete'

const styles = theme => ({
    root: {
        width: '100%',  
        border: 'none', 
        boxShadow: 'none',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        background: 'white',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'left',
        marginBottom: '20px',
        borderTop: 'black solid 1px',
        width: '85.5%',
        marginLeft: '5%'
    }
    
});

function SimpleExpansionPanel(props) {
    const { classes, openCheckout, handleOpenCheckout } = props;
    const [complete, toggleComplete] = useState(false);
    const toggleSuccess = () => {
        toggleComplete(complete === false ? true : false)
    }        
    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={openCheckout} square className={classes.root}>
                <ExpansionPanelDetails className={classes.details}>
                    
                    {/* <Typography style={{color: 'white'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography> */}
                    {(complete)?<Complete toggleCheckout={handleOpenCheckout} openCheckout={openCheckout}/>:
                    <Cart toggleComplete={toggleSuccess} toggleCheckout={handleOpenCheckout} openCheckout={openCheckout}/>}

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);