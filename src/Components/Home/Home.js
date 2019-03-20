import React, { useState, useEffect, Suspense, memo } from 'react'
import Modal from '@material-ui/core/Modal';
import Authentication from '../Authentication/Authentication';
const Nav = React.lazy(() => import('../Nav/Nav'))


const Home = () => {

    const [count, setCount] = useState(0);
    const [open, handleOpen] = useState(false);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            {/* <Suspense fallback={<div>loading...</div>}>
                <Nav />
            </Suspense> */}
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

