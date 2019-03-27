import React, { useState, useEffect, Suspense, memo } from 'react'
import './BuyBox.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const BuyBox = () => {

    return (

        <Grid container spacing={40} justify='center' className="buybox">
            <Grid item>
                <img src='https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg' alt='' />  
            </Grid>
            <Grid item className='prod-desc' style={{ paddingRight: '55px', paddingLeft: '55px'}}>
                LIME SQUEEZER
                <p>$25</p>
            </Grid>
            <Grid item>
                <Button style={{ borderRadius: '0', backgroundColor: '#388e3c'}} variant="contained" color="primary" size='large'>
                BUY NOW
                </Button>
            </Grid>
        </Grid>
    )
}

export default memo(BuyBox) 