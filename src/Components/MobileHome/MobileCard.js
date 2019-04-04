import * as api from '../../moltin';
import React, { useState, Suspense, useEffect, memo } from 'react'
import ReactPlayer from 'react-player';
import Chat from './../Chat/Chat'
import { Chat as ChatIcon } from '@material-ui/icons'
import Close from '@material-ui/icons/Close'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import Grid from '@material-ui/core/Grid';
import ImageZoom from 'react-medium-image-zoom'
import Button from '@material-ui/core/Button';
import './MobileHome.scss'


const MobileCard = (props) => {
    const { archive_id, status, url, product_id, hls } = props.stream
    const [productDetails, setProductDetails] = useState({}) 
    const [imgID, setImgID] = useState('') 
    const [price, setPrice] = useState('')
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [chatDisplay, setChatDisplay] = useState(false);
    const [openCheckout, handleOpenCheckout] = useState(false);

    const archiveUrl = `https://lime-archive.s3.amazonaws.com/46286302/${archive_id}/archive.mp4`
    
    useEffect(() => {
        moltinProduct()
    }, [productDetails])

    const moltinProduct = async () => {
        const mProduct = await api.GetProduct(product_id)
        await setProductDetails(mProduct)
        // console.log(productDetails)
        await setImgID(mProduct.included.main_images[0].link.href)
        await setPrice(mProduct.data.price[0].amount)
    }

    const toggleMuted = () => {
        setMuted(muted === false ? true : false)
    };
    const toggleChat = () => {
        setChatDisplay(chatDisplay === false ? true : false)
    };

    return (
        <div>
            {
                (status === 'live' ?
                <div className='m-body-wrapper'>
                    <div className='m-player-wrapper'>
                        <ReactPlayer
                        className='m-react-player'
                        url={hls}
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
                :
                <div className='m-body-wrapper'>
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
                        <img src={url} alt='Golden Gate Bridge' className='m-product-img'/>
                        <Grid item className='prod-desc' style={{marginLeft: '4%'}}>
                            {/* <h3>{productDetails.data.name}</h3> */}
                            <p>${price/100}</p>
                            <Button onClick={() => handleOpenCheckout(!openCheckout)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'>
                                BUY NOW
                            </Button>
                        </Grid>
                    </div>
                </div>)
            }
        </div>
    )
}

export default MobileCard