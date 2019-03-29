import React, { useState, useEffect, Suspense, memo } from 'react'
import './BuyBox.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageZoom from 'react-medium-image-zoom'
import CheckoutPanel from '../CheckoutPanel/CheckoutPanel'


const BuyBox = (props) => {
    const {openCheckout, handleOpenCheckout} = props;
    return (

        <Grid container spacing={40} justify='center' className="buybox">
            <Grid item style={{ marginRight: '4%' }}>
                <div className='image-item'>
                {/* <div className='thumbnail-container'>
                        <ImageZoom zoomMargin='40'
                            image={{
                                src: 'https://cdn.pixabay.com/photo/2016/02/25/16/21/fruit-1222428_960_720.png',
                                alt: 'Two Lime Halves',
                                className: 'thumbnails',

                            }}
                            zoomImage={{
                                src: 'https://cdn.pixabay.com/photo/2016/02/25/16/21/fruit-1222428_960_720.png',
                                alt: 'Two Lime Halves',
                            }}
                        />
                        <ImageZoom zoomMargin='40'
                            image={{
                                src: 'https://media.gettyimages.com/photos/face-picture-id585307708?b=1&k=6&m=585307708&s=612x612&w=0&h=TiEaj0-aOO5S0EWQQiPqEsTX3u6-kOfAIuOsLl96FH0=',
                                alt: 'Golden Gate Bridge',
                                className: 'thumbnails',

                            }}
                            zoomImage={{
                                src: 'https://media.gettyimages.com/photos/face-picture-id585307708?b=1&k=6&m=585307708&s=612x612&w=0&h=TiEaj0-aOO5S0EWQQiPqEsTX3u6-kOfAIuOsLl96FH0=',
                                alt: 'Golden Gate Bridge',
                            }}
                        />
                        <ImageZoom zoomMargin='40'
                            image={{
                                src: 'https://cdn.dribbble.com/users/1822658/screenshots/5491233/baby_lemon_head_2x.png',
                                alt: 'Golden Gate Bridge',
                                className: 'thumbnails',

                            }}
                            zoomImage={{
                                src: 'https://cdn.dribbble.com/users/1822658/screenshots/5491233/baby_lemon_head_2x.png',
                                alt: 'Golden Gate Bridge',
                            }}
                        />       
                </div> */}
                <div>
                    <ImageZoom zoomMargin='100'
                        image={{
                            src: 'https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg',
                            alt: 'Golden Gate Bridge',
                            className: 'img-zoom',
                            
                        }}
                        zoomImage={{
                            src: 'https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg',
                            alt: 'Golden Gate Bridge',
                        }}
                    />

                </div>

            </div>
                {/* <img src='https://i.ebayimg.com/images/g/0BkAAOSww6daAfgg/s-l300.jpg' alt='' />   */}
            </Grid>
            <Grid item className='prod-desc' style={{marginLeft: '4%'}}>
                    LIME SQUEEZER
                <p>$25</p>
                <Button onClick={() => handleOpenCheckout(!openCheckout)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'>
                    BUY NOW
                </Button>
            </Grid>
        </Grid>
    )
}

export default memo(BuyBox) 