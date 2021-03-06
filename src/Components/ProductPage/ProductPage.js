import React, { useState, Suspense, useEffect, memo } from 'react'
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import './ProductPage.scss'
import ProductDesc from '../ProductDesc/ProductDesc'
import BuyBox from '../BuyBox/BuyBox'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginButton from '../Home/Button'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../mui_theme'
import CheckoutPanel from '../CheckoutPanel/CheckoutPanel'
import logo from '../Home/shoplime-logo.png'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import { Link } from 'react-router-dom'
const Videos = React.lazy(() => import('../Videos/Videos'))

const ProductPage = (props) => {

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
    const [reRender, reRenderPage] = useState(false)
    const [streamID, setStreamID] = useState('')
    const [streamName, setStreamName] = useState('')

    const [heroID, setHeroID] = useState('')
    
    useEffect(() => {
        const {productid, streamid, name} = props.match.params
        getUser()
        setHeroID(productid)
        setStreamID(streamid)
        setStreamName(name)
        axios.get('/homeStreams')
            .then(res => {
                if (res.data[0].status === 'live') {
                    const { hls } = res.data[0]
                    setHLS(hls)
                    setLive(true)
                    setPastStreams(res.data)

                } else {

                    setLive(false)
                    setPastStreams(res.data)

                }
            })
    }, [heroID, streamID, props.match.params])
    console.log(pastStreams)
    const toggleCheckout = () => {
        setCheckout(checkout === false ? true : null)
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
    const pageReRender = () => {
        reRenderPage(reRender === false ? true : false)
    }
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

        if (!isEmail) {
            handleError('PLEASE ENTER VALID EMAIL')
        } else if (!isPassword.bool) {
            handleError(isPassword.message)
        } else {
            await axios.post('/user/register', { email, password })
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
        await axios.post('/user/login', { email, password })
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
            <div className='header-container1'>

                <Modal open={open} onClose={() => handleOpen(false)}>
                    <Authentication handleEmail={handleEmail} handlePassword={handlePassword} handleOpen={handleOpen} register={register} login={login} loginError={loginError} />
                </Modal>

                <MuiThemeProvider theme={theme}>
                    <AppBar color="secondary">
                        <Toolbar style={{ justifyContent: 'space-between', padding: '0px 20%' }}>
                            <div className='logo-container'>
                                <Link to='/'><img src={logo} alt='' /></Link>
                            </div>
                            <Typography variant="h3" style={{fontSize: '10px', marginLeft: '30%', textDecoration: 'none', padding: '5px', display: 'flex', flexDirection: 'row'}} id='viewLive'>
                                <Link to='/' style={{fontSize: '13px', color: 'red'}}>GO TO LIVE STREAM <div className='live-pulse-2' style={{float: 'right', marginTop: '2px', marginLeft: '7px'}}></div></Link>
                            </Typography>
                            <LoginButton handleOpen={handleOpen} handleError={handleError} user={user} fullWidth={true}></LoginButton>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>


            <div className='body-container1'>
                <div className='player-container1'>
                    <div className='player-wrapper1'>
                        {
                            (live ?
                                <ReactPlayer
                                    className='react-player1'
                                    url={`https://lime-archive.s3.amazonaws.com/46286302/${streamID}/archive.mp4`}
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
                                :
                                <ReactPlayer
                                    className='react-player1'
                                    url={`https://lime-archive.s3.amazonaws.com/46286302/${streamID}/archive.mp4`}
                                    playing={true}
                                    loop={true}
                                    controls={false}
                                    volume={0.8}
                                    muted={muted}
                                    pip={false}
                                    width={'100%'}
                                    height={'100%'}
                                />
                            )
                        }
                        <div className='overlay1'>
                            <div className='title-overlay1'>
                                <h3 style={{ margin: '10px 15px' }}>{streamName}</h3>
                                {live &&
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='live-pulse'></div>
                                        <p style={{ color: 'red', fontSize: '14px' }}>LIVE</p>
                                    </div>}

                            </div>
                            {/* <div className='subtitle-overlay1'>
                                <p style={{ margin: '0 17px', fontSize: '14px' }}>by <span style={{ fontWeight: 'bolder' }}>Nike</span></p>
                            </div> */}
                            <button onClick={toggleMuted} className='icon-button'>{(muted ? <VolumeOff className='mute' /> : <VolumeUp className='mute' />)}</button>
                            <div className='right-overlay1'>
                                {/* <button onClick={toggleChat} className='icon-button'>{(chatDisplay ? <Close className='chat-toggle' /> : <ChatIcon className='chat-toggle' />)}</button>
                                {chatDisplay && <div className='chat-wrapper'><Chat /></div>} */}
                            </div>
                        </div>
                    </div>
                    
                        
                        <BuyBox openCheckout={openCheckout} handleOpenCheckout={handleOpenCheckout} heroID={heroID} reRender={pageReRender} toggleCheckout={toggleCheckout} />
                        <CheckoutPanel openCheckout={openCheckout} handleOpenCheckout={handleOpenCheckout} />
                        <ProductDesc heroID={heroID} />
                        
                </div>
                <div className='recently-live1'>
                    <h3>RECENTLY LIVE</h3>
                </div>
                <Suspense fallback={<></>}>
                    <Videos handleOpen={handleOpen} handleError={handleError} user={user} pastStreams={pastStreams} heroID={heroID} streamID={streamID} />
                </Suspense>

            </div>
        </div>
    )
}

export default memo(ProductPage)

