import React from 'react';

const Complete = (props) => {
    return(
        <div className='complete'>
            <h1>Purchase Complete!</h1>
            <button onClick={()=>props.toggleCheckout(!props.openCheckout)}>RETURN</button>
        </div>
    )
}

export default Complete