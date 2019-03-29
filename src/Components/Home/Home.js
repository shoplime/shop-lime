import React, { useState, useEffect, Suspense, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import Chat from './../Chat/Chat'
import './Home.scss'
import ProductDesc from '../ProductDesc/ProductDesc'
import BuyBox from '../BuyBox/BuyBox'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginButton from './Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../mui_theme'
import CheckoutPanel from '../CheckoutPanel/CheckoutPanel'
const Videos = React.lazy(() => import('../Videos/Videos'))


const Home = () => {
    
    const [checkout, setCheckout] = useState(false);
    const [openCheckout, handleOpenCheckout] = useState(false);
    
    const [open, handleOpen] = useState(false);
    const [email, handleEmail] = useState('')
    const [password, handlePassword] = useState('') 
    const [loginError, handleError] = useState('')
    const [user, handleUser] = useState(false)
    
    const [hls, setHLS] = useState('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8')
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true)

    useEffect(() => {
        getUser()
    }, [user]);

    const toggleCheckout = () => {
        setCheckout(checkout === false ? true : false)
    };
    const togglePlaying = () => {
        setPlaying(playing === false ? true : false)
    };
    const toggleMuted = () => {
        setMuted(muted === false ? true : false)
    };
    const getUser = async () => {
        await axios.get('/user/fetchuser')
            .then(() => {
                handleUser(true)
            })
            .catch(() => {
                handleUser(false)
            })
    }
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
                    handleUser(true)  
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
                handleUser(true)
            })
            .catch(() => {
                handleError('INCORRECT EMAIL OR PASSWORD')
            })    
    }

    return (
        <div>
            <div className='header-container'>
            
                <Modal open={open} onClose={() => handleOpen(false)}>
                    <Authentication handleEmail={handleEmail} handlePassword={handlePassword} handleOpen={handleOpen} register={register} login={login} loginError={loginError}/>
                </Modal>

                <MuiThemeProvider theme={theme}>
                    <AppBar color="secondary">
                        <Toolbar style={{justifyContent:'space-between', padding: '0px 20%'}}>
                            {/* <MenuIcon></MenuIcon> */}
                            <Typography variant="h5">
                                SHOPLIME
                            </Typography>
                            <LoginButton handleOpen={handleOpen} handleError={handleError} user={user} fullWidth={true}></LoginButton>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>   

            <div className='body-container'>
                <div className='player-container'>
                    <ReactPlayer
                        url={hls}
                        playing={false}
                        controls={true}
                        volume={0.8}
                        muted={true}
                        pip={false}
                        width={'100%'}
                        height={'100%'}
                        config={{
                            file: {
                                forceHLS: true
                            }
                        }}
                    />
                    {/* <input onChange={e => setHLS(e.target.value)} value={hls} /> */}
                <BuyBox openCheckout={openCheckout} handleOpenCheckout={handleOpenCheckout}/>
                <CheckoutPanel openCheckout={openCheckout} handleOpenCheckout={handleOpenCheckout}/>
                <ProductDesc/>
                </div>
                <div className='recently-live'>
                    <h3>RECENTLY LIVE</h3>
                </div>
                <Suspense fallback={<></>}>
                    <Videos handleOpen={handleOpen} handleError={handleError} user={user}/>
                </Suspense>
                
                
                {/* <div>
                    <button onClick={toggleCheckout}>Add to Cart</button>
                    {checkout?<OrderModal toggle={toggleCheckout}/>:null}
                </div> */}
                
            </div>   
        </div>
    )
}

export default memo(Home)

