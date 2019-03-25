import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'left'
       
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: [
            'montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

function SimpleExpansionPanel(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ExpansionPanel square className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Product Description</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.heading}>
                        Spicy jalapeno bacon ipsum dolor amet hamburger turkey frankfurter rump porchetta sirloin shankle biltong. Biltong t-bone frankfurter turducken ground round tenderloin ham hamburger sausage. Kielbasa alcatra jowl, pig cow doner corned beef salami ribeye meatball short loin shank hamburger sausage. Prosciutto pig spare ribs doner meatloaf jerky beef hamburger pancetta frankfurter bresaola. Turkey pork biltong doner, spare ribs beef ribs buffalo tenderloin turducken fatback salami beef corned beef. Ribeye pancetta corned beef tail burgdoggen picanha jowl prosciutto short ribs pig sausage tenderloin. Jerky pork loin tongue, brisket salami short loin sirloin picanha ham tri-tip andouille corned beef flank landjaeger.
                        <br></br>
                        <br></br>
                        Bresaola buffalo ribeye shank, spare ribs tri-tip chuck cupim burgdoggen. Pork belly picanha filet mignon ball tip swine pork andouille spare ribs ham hock drumstick. Kielbasa tri-tip meatloaf prosciutto porchetta burgdoggen biltong. Burgdoggen doner meatball bacon t-bone.

                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);

