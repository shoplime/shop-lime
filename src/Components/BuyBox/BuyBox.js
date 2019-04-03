import React, { useEffect, useState } from 'react'
import './BuyBox.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import ImageZoom from 'react-medium-image-zoom'
import ImageZoom from 'react-medium-image-zoom'
import { connect } from 'react-redux';
import * as api from '../../moltin';


const BuyBox = (props) => {
    
    const {openCheckout, handleOpenCheckout, heroID } = props;

    const [productDetails, setProductDetails] = useState({}) 
    const [imgID, setImgID] = useState('') 
    const [price, setPrice] = useState('') 

   
   useEffect(() => {
       if(heroID){
           getImage()
       }     
    }, [heroID, openCheckout])
    const getImage = async () => {
        const mProduct = await api.GetProduct(heroID)
        await setProductDetails(mProduct) 
        console.log(mProduct)     
        await setImgID(mProduct.included.main_images[0].link.href)
        await setPrice(mProduct.data.price[0].amount)
    }
   
     const addToCart = async (id, quantity) => {
       await api.AddCart(id, quantity)
    //    reRender()
      if (openCheckout===false){ handleOpenCheckout(!openCheckout) }
    }
    
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <ImageZoom zoomMargin='100'
                            image={{
                                src: `${imgID}`,
                                alt: '',
                                className: 'img-zoom',
                                
                            }}
                            zoomImage={{
                                src: `${imgID}`,
                                alt: 'Product image zoom',
                            }}
                        />
                    </Suspense>

                </div>

            </div>
            </Grid>
            <Grid item className='prod-desc' style={{marginLeft: '4%'}}>
                <p></p>
                {productDetails.data && <h3>{productDetails.data.name}</h3>}
                <p>${price/100}</p>
                {/* <Button onClick={() => handleOpenCheckout(!openCheckout)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'></Button> */}
                    
                <Button onClick={()=>addToCart(props.heroID,1)}style={{ borderRadius: '0', backgroundColor: '#388e3c', marginTop: '20px', fontFamily: 'Montserrat'}} variant="contained" color="primary" size='large'>
                    BUY NOW
                </Button>
                
                    

                

                
            </Grid>
        </Grid>
    )
}

const mapStateToProps = ({ products }) => ({
    products
  });
  
  export default connect(mapStateToProps)(BuyBox);