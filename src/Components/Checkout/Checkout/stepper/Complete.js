import React from 'react';

const Complete = (props) => {
    return(
        <div>
            Purchase Complete!
            <button onClick={props.toggleCheckout}>Return</button>
        </div>
    )
}

export default Complete