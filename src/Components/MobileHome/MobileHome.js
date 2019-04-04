import React, { useState, Suspense, useEffect, memo } from 'react'
import SwipeableViews from 'react-swipeable-views';
import './MobileHome.scss'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MobileCard from './MobileCard'
import ViewCounter from './../ViewCounter/ViewCounter'
import * as api from '../../moltin';

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
    const [productDetails, setProductDetails] = useState({}) 
    const [imgID, setImgID] = useState('') 
    const [price, setPrice] = useState('') 
    


    useEffect(() => {
        getUser()
    }, [user]);
    useEffect(() => {
        axios.get('/homeStreams')
        .then(res => {
            setStreams(res.data)
        })
    }, [streams])
    
    const getImage = async (productId) => {
        const mProduct = await api.GetProduct(productId)
        await setProductDetails(mProduct) 
        console.log(mProduct)     
        await setImgID(mProduct.included.main_images[0].link.href)
        await setPrice(mProduct.data.price[0].amount)
    }
    
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
            <SwipeableViews containerStyle={{height: '100vh'}} axis="y" resistance>
                {
                    streams.map((stream, index) => {
                        return(
                            <MobileCard stream={stream}/>
                        )
                    })
                }
            </SwipeableViews>
        </div>
    )
}

export default memo(MobileHome)