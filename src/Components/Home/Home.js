import React, { useState, useEffect, Suspense, memo } from 'react'
import OrderModal from '../OrderModal/OrderModal';
const Nav = React.lazy(() => import('../Nav/Nav'))

const Home = () => {

    const [count, setCount] = useState(0);
    const [checkout, setCheckout] = useState(false);
    

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });
    const toggleCheckout = () => {
        setCheckout(checkout === false? true : false)
    };

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
                <button onClick={toggleCheckout}>Add to Cart</button>
                {checkout?<OrderModal toggle={toggleCheckout}/>:null}
            </div>
        </div>
    )
}

export default memo(Home)

