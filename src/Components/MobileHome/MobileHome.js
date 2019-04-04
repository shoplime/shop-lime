import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views';
import './MobileHome.scss'
import axios from 'axios';
import AuthLogic from '../../Testing/AuthLogic'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MobileCard from './MobileCard'
import ViewCounter from './../ViewCounter/ViewCounter'
import * as api from '../../moltin';

class MobileHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            checkout: false,
            openCheckout: false,
            open: false,
            email: '',
            password: '',
            loginError: '',
            user: false,
            streams: [],
            productDetails: {},
            prodNames: [],
            prodImages: [],
            prodPrices: []
        }
    }

    componentDidMount(){
        axios.get('/homeStreams')
        .then(res => {
            this.setState({
                streams: res.data
            })
            console.log(res.data)
            res.data.forEach(async (stream) => {
                await this.getProductInfo(stream.product_id)
                .then((mProduct) => {
                    const { prodNames, prodImages, prodPrices } = this.state
                    console.log(prodNames, prodImages, prodPrices)
                    const newNames = [...prodNames, mProduct.data.name]
                    const newImages = [...prodImages, mProduct.included.main_images[0].link.href]
                    const newPrices = [...prodPrices, mProduct.data.price[0].amount]
                    console.log(newNames, newImages, newPrices)

                    this.setState({
                        prodNames: newNames,
                        prodImages: newImages,
                        prodPrices: newPrices,
                    })
                    console.log(this.state)
                })
            })
            console.log(this.state)
        })
    }

    getProductInfo = async (product) => {
        console.log('moltin hit')
        const mProduct = await api.GetProduct(product)
        return mProduct
    }

    render(){
        return (
            <div className='m-body-container'>
                <SwipeableViews containerStyle={{height: '100vh'}} axis="y" resistance>
                    {
                        this.state.streams.map((stream, index) => {
                            return(
                                <MobileCard stream={stream} prodName={this.state.prodNames[index]} prodImage={this.state.prodImages[index]} prodPrice={this.state.prodPrices[index]} />
                            )
                        })
                    }
                </SwipeableViews>
            </div>
        )
    }
}

export default MobileHome