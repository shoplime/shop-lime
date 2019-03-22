import React, { useState, useEffect, Suspense, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
import ReactPlayer from 'react-player';
import './Home.scss'
import axios from 'axios';
const appLogic = import('../../Testing/AppLogic')
const Nav = React.lazy(() => import('../Nav/Nav'))
// const Nav = React.lazy(() => import('../Nav/Nav'))


const Home = () => {
    console.log('Password type', typeof password)

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
        const isEmail = appLogic.validateEmail(email)
        const isPassword = appLogic.validatePassword(password)
        await axios.post('/user/register', {email, password})
            .then((res) => {
                console.log(res)
                handleOpen(false)
            })
            .catch((res) => {
                console.log('Msg 1', res)
                console.log('Msg 1', res.errormsg2)
                handleError('Register Error')
            })    
    }
    const login = async () => {
        await axios.post('/user/login', {email, password})
            .then((res) => {
                console.log(res)
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
    )
}

export default memo(Home)

