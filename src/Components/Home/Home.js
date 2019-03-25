import React, { useState, useEffect, Suspense, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import './Home.scss'
import ProductDesc from '../ProductDesc/ProductDesc'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginButton from './Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../mui_theme'
const Nav = React.lazy(() => import('../Nav/Nav'))
// const Nav = React.lazy(() => import('../Nav/Nav'))



const Home = () => {
    
    const [count, setCount] = useState(0);
    const [checkout, setCheckout] = useState(false);
    
    const [open, handleOpen] = useState(false);
    const [email, handleEmail] = useState('')
    const [password, handlePassword] = useState('') 
    const [loginError, handleError] = useState('')
    
    const [hls, setHLS] = useState('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8')
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        
    });
    const toggleCheckout = () => {
        setCheckout(checkout === false? true : false)
    };
    const register = async () => {
        const isEmail = AuthLogic.validateEmail(email)
        const isPassword = AuthLogic.validatePassword(password)
        
        if(!isEmail){
            handleError('PLEASE ENTER VALID EMAIL')
        }else if(!isPassword.bool){
            handleError(isPassword.message)
        }else{
            await axios.post('/user/register', {email, password})
                .then(() => {
                    handleError('Success!')
                    handleOpen(false)   
                })
                .catch(() => {
                    handleError('EMAIL ALREADY EXISTS!')
                })    
        }   
    }
    const login = async () => {
        await axios.post('/user/login', {email, password})
            .then(() => {
                handleOpen(false)
            })
            .catch(() => {
                handleError('INCORRECT EMAIL OR PASSWORD')
            })    
    }
    

    return (
        
        <div>
            {/* <Suspense fallback={<div>loading...</div>}>
                <Nav />
            </Suspense> */}
            <MuiThemeProvider theme={theme}>
                <AppBar color="secondary">
                    <Toolbar>
                        {/* <MenuIcon></MenuIcon> */}
                        <Typography variant="h5">
                            Shop Lime
                        </Typography>
                        <LoginButton handleOpen={handleOpen} handleError={handleError} fullWidth={true}></LoginButton>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>

            <div className='body-container'>
                <div className='player-container'>
                    <ReactPlayer
                        url={hls}
                        playing={true}
                        controls={true}
                        volume={0.8}
                        muted={false}
                        pip={false}
                        width={'100%'}
                        height={'100%'}
                        config={{
                            file: {
                                forceHLS: true
                            }
                        }}
                    />
                    <input onChange={e => setHLS(e.target.value)} value={hls} />
                </div>
                <ProductDesc/>
                <div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                </div>
                <div>
                    <button onClick={toggleCheckout}>Add to Cart</button>
                    {checkout?<OrderModal toggle={toggleCheckout}/>:null}
                </div>
                <div>
                    <p>Is modal open? {open}</p>
                    <p>Password: {password}</p>
                    <p>state email: {email}</p>
                    <button onClick={() => {handleOpen(true); handleError('')}} >
                        Open Modal
                    </button>
                </div>
                
                <Modal open={open} onClose={() => handleOpen(false)}>
                    <Authentication handleEmail={handleEmail} handlePassword={handlePassword} handleOpen={handleOpen} register={register} login={login} loginError={loginError}/>
                </Modal>

            </div>   
        </div>
    )
}

export default memo(Home)

