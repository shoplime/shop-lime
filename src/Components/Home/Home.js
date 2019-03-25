import React, { useState, useEffect, Suspense, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import Chat from './../Chat/Chat'
import './Home.scss'
const Nav = React.lazy(() => import('../Nav/Nav'))
// const Nav = React.lazy(() => import('../Nav/Nav'))


const Home = () => {

    const [count, setCount] = useState(0);
    const [checkout, setCheckout] = useState(false);
    
    const [open, handleOpen] = useState(false);
    const [hls, setHLS] = useState('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8')
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true)

    useEffect(() => {
        // document.title = `You clicked ${count} times`;
    });
    const toggleCheckout = () => {
        setCheckout(checkout === false ? true : false)
    };
    const togglePlaying = () => {
        setPlaying(playing === false ? true : false)
    };
    const toggleMuted = () => {
        setMuted(muted === false ? true : false)
    };

    return (
        <div>
            {/* <Suspense fallback={<div>loading...</div>}>
                <Nav />
            </Suspense> */}
            <header className="header">
                <div className='header-left'>SHOP LIME</div>
                <div className='header-right'>CART</div>
            </header>
            <div className='player-container'>
                <ReactPlayer
                    className='react-player'
                    url={hls}
                    playing={playing}
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
            </div>
            {/* <button onClick={togglePlaying}>Play/Pause</button> */}
            <button onClick={toggleMuted}>Mute/Unmute</button>
            <input onChange={e => setHLS(e.target.value)} value={hls} />
            <div>
                <button onClick={toggleCheckout}>Add to Cart</button>
                {checkout?<OrderModal toggle={toggleCheckout}/>:null}
            </div>
            <div>
                <p>Is modal open? {open}</p>
                <button onClick={() => handleOpen(true)}>
                    Open Modal
                </button>
            </div>
            
            <Modal open={open} onClose={() => handleOpen(false)}>
                <Authentication />
            </Modal>
            
        </div>
    )
}

export default memo(Home)

