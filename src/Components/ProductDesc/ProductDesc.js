import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as api from '../../moltin';

const styles = theme => ({
    root: {
        width: '90%',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'left',
        marginBottom: '10px', 
        // marginTop: '10px',
        marginRight: '0px',
        padding: '0px 5%',
        
        
       
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
        marginRight: '0px'
        
        
    },
});

function SimpleExpansionPanel(props) {
    
    const { classes, heroID } = props;
    const [prodDesc, setProdDesc] = useState('')

    useEffect(() => {
       if(heroID){
           getImage()
       }     
    }, [heroID])
    const getImage = async () => {
        const mProduct = await api.GetProduct(heroID)
        await setProdDesc(mProduct.data.description) 
    }

    return (
        <div className={classes.root}>
            <ExpansionPanel square className={classes.root} style={{ marginRight: '0px', borderTop: '1px solid black'}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading} style={{ fontWeight: '600', marginTop: '20px'}}>PRODUCT DETAILS</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.heading}>
                        
                       <span>
                           {prodDesc}
                       </span>


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

