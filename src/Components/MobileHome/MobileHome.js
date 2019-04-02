import React, { useState, Suspense, useEffect, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import SwipeableViews from 'react-swipeable-views';
import ReactPlayer from 'react-player';
import Chat from './../Chat/Chat'
import './MobileHome.scss'
import ProductDesc from '../ProductDesc/ProductDesc'
import BuyBox from '../BuyBox/BuyBox'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import AppBar from '@material-ui/core/AppBar';
// import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginButton from './../Home/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../mui_theme'
import CheckoutPanel from '../CheckoutPanel/CheckoutPanel'
import { Chat as ChatIcon } from '@material-ui/icons'
import Close from '@material-ui/icons/Close'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageZoom from 'react-medium-image-zoom'
const Nav = React.lazy(() => import('../Nav/Nav'))
const Videos = React.lazy(() => import('../Videos/Videos'))

const MobileHome = () => {
    
    const [checkout, setCheckout] = useState(false);
    const [openCheckout, handleOpenCheckout] = useState(false);
    
    const [open, handleOpen] = useState(false);
    const [email, handleEmail] = useState('')
    const [password, handlePassword] = useState('') 
    const [loginError, handleError] = useState('')
    const [user, handleUser] = useState(false)
    
    const [hls, setHLS] = useState('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8')
    const [archive, setArchive] = useState('')
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [live, setLive] = useState(false)
    const [pastStreams, setPastStreams] = useState([])
    const [streams, setStreams] = useState([])

    useEffect(() => {
        getUser()
    }, [user]);
    useEffect(() => {
        axios.get('/homeStreams')
        .then(res => {
            setStreams(res.data)
            // if(res.data[0].status === 'live'){
            //     const { name, product_id, hls } = res.data[0]
            //     setHLS(hls)
            //     setLive(true)
            // } else {
            //     const { name, archive_id, product_id } = res.data[0]
            //     setArchive(`https://lime-archive.s3.amazonaws.com/46286302/${archive_id}/archive.mp4`)
            //     setLive(false)
            // }
        })
    })

    const toggleCheckout = () => {
        setCheckout(checkout === false ? true : false)
    };
    const togglePlaying = () => {
        setPlaying(playing === false ? true : false)
    };
    const toggleMuted = () => {
        setMuted(muted === false ? true : false)
    };
    const toggleChat = () => {
        setChatDisplay(chatDisplay === false ? true : false)
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
        <div className='m-body-container'>
        <div className='m-header'>LIME</div>
            <SwipeableViews containerStyle={{height: '100vh'}} axis="y" resistance>
                {
                    streams.map((stream, i) => {
                        if(stream.status === 'live'){
                            return (
                                <div className='m-body-wrapper' key={i}>
                                    <div className='m-player-wrapper'>
                                        <ReactPlayer
                                        className='m-react-player'
                                        url={stream.hls}
                                        playing={true}
                                        loop={true}
                                        controls={false}
                                        volume={0.8}
                                        muted={muted}
                                        pip={false}
                                        width={'100%'}
                                        height={'100%'}
                                        config={{
                                            file: {
                                                forceHLS: true
                                            }
                                        }}
                                        />
                                        <div className='m-overlay'>
                                            <button onClick={toggleMuted} className='icon-button'>{(muted ? <VolumeOff className='mute'/> : <VolumeUp className='mute'/> )}</button>
                                            <div className='right-overlay'>
                                                <button onClick={toggleChat} className='icon-button'>{(chatDisplay ? <Close className='chat-toggle'/> : <ChatIcon className='chat-toggle'/> )}</button>                   
                                                {chatDisplay && <div className='m-chat-wrapper'><Chat /></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-product-wrapper'>
                                        <ImageZoom zoomMargin='50'
                                            image={{
                                                src: 'https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg',
                                                alt: 'Golden Gate Bridge',
                                                className: 'img-zoom',
                                            }}
                                            zoomImage={{
                                                src: 'https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg',
                                                alt: 'Golden Gate Bridge',
                                            }}
                                        />
                                        <Grid item className='prod-desc' style={{marginLeft: '4%'}}>
                                                LIME SQUEEZER
                                            <p>$25</p>
                                            <Button onClick={() => handleOpenCheckout(!openCheckout)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'>
                                                BUY NOW
                                            </Button>
                                        </Grid>
                                    </div>
                                </div>
                            )
                        } else {
                            const archiveUrl = `https://lime-archive.s3.amazonaws.com/46286302/${stream.archive_id}/archive.mp4`
                            return (
                                <div className='m-body-wrapper' key={i}>
                                    <div className='m-player-wrapper'>
                                        <ReactPlayer
                                        className='m-react-player'
                                        url={archiveUrl}
                                        playing={true}
                                        loop={true}
                                        controls={false}
                                        volume={0.8}
                                        muted={muted}
                                        pip={false}
                                        width={'100%'}
                                        height={'100%'}
                                        />
                                        <div className='m-overlay'>
                                            <button onClick={toggleMuted} className='icon-button'>{(muted ? <VolumeOff className='mute'/> : <VolumeUp className='mute'/> )}</button>
                                            <div className='right-overlay'>
                                                <button onClick={toggleChat} className='icon-button'>{(chatDisplay ? <Close className='chat-toggle'/> : <ChatIcon className='chat-toggle'/> )}</button>                   
                                                {chatDisplay && <div className='chat-wrapper'><Chat /></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-product-wrapper'>
                                        <img src='https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg' alt='Golden Gate Bridge' className='m-product-img'/>
                                        <Grid item className='prod-desc' style={{marginLeft: '4%'}}>
                                                LIME SQUEEZER
                                            <p>$25</p>
                                            <Button onClick={() => handleOpenCheckout(!openCheckout)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'>
                                                BUY NOW
                                            </Button>
                                        </Grid>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </SwipeableViews>
        </div>
    )
}

export default memo(MobileHome)

                
