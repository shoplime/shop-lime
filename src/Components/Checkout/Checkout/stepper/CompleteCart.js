import React from 'react';
import { Link } from 'react-router-dom';
const Complete = () => {
    return(
        <div className='complete'>
            <h1>Purchase Complete!</h1>
            <Link to='/'><button>RETURN</button></Link>
        </div>
    )
}

export default Complete