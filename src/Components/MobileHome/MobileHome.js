import React, { useState, Suspense, useEffect, memo } from 'react'
import SwipeableViews from 'react-swipeable-views';
import './MobileHome.scss'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import MobileCard from './MobileCard'
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
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [streams, setStreams] = useState([])

    useEffect(() => {
        getUser()
    }, [user]);
    useEffect(() => {
        axios.get('/homeStreams')
        .then(res => {
            console.log(res.data)
            setStreams(res.data)
        })
     },[])

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
                    streams.map((stream, i) => (
                        <MobileCard key={i} stream={stream}/>
                    ))
                }
            </SwipeableViews>
        </div>
    )
}

export default memo(MobileHome)

                
