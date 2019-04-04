import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../mui_theme'
import { connect } from 'react-redux';
import { updateUser } from './../../ducks/user'
import axios from 'axios'
import './Login.scss'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
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
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: '20px',
    },
});


const Login = (props) => {

    const [email, handleEmail] = useState('')
    const [password, handlePassword] = useState('') 
    const [loginError, handleError] = useState('')
    
    const login = async () => {
        await axios.post('/user/login', {email, password})
            .then(res => {
                console.log(res.data)
                props.updateUser(res.data)
                props.history.push('/admin');
            })
            .catch(() => {
                handleError('INCORRECT EMAIL OR PASSWORD')
            })    
    }
    const { classes } = props;
    return (
        <div className='login-container'>
            <MuiThemeProvider theme={theme}>    
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className={classes.typography} component="h1" variant="h5">
                            Dashboard Login
                        </Typography>
                        <form className={classes.form} >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel className={classes.typography} htmlFor="email">Email Address</InputLabel>
                                <Input onChange={(e) => handleEmail(e.target.value)} id="email" type="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel className={classes.typography} htmlFor="password">Password</InputLabel>
                                <Input onChange={(e) => handlePassword(e.target.value)} style={{ marginBottom: '30px' }} name="password" type="password" id="password" autoComplete="current-password" />
                            </FormControl>
                            <Button
                                onClick={() => login()} 
                                type="button"                      
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                            <div className='login-error'>
                                <p>{loginError}</p>
                            </div>
                        </form>
                    </Paper>
                </main>
            </MuiThemeProvider>
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    const { id, admin } = state
    return {
        id,
        admin,
    };
  };
  
const adminPermission = connect(mapStateToProps, {updateUser})(Login);

export default withStyles(styles)(adminPermission);



