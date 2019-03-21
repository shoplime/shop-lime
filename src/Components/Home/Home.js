import React, { useState, useEffect, Suspense, memo } from 'react'
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import './Home.scss'
const Nav = React.lazy(() => import('../Nav/Nav'))
// const Nav = React.lazy(() => import('../Nav/Nav'))


const Home = () => {

    const [count, setCount] = useState(0);
    const [open, handleOpen] = useState(false);
    const [hls, setHLS] = useState('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8')

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

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
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
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

