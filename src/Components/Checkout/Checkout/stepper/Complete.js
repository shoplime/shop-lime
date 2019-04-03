import React from 'react';
const Complete = (props) => {
    const completeCheckout = () => {
        props.toggleCheckout(!props.openCheckout)
        props.reRender()
    }
    return(
        <div className='complete'>
            <h1>Purchase Complete!</h1>
            <button onClick={completeCheckout}>RETURN</button>
        </div>
    )
}

export default Complete