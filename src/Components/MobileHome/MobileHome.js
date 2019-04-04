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
            // const p_names = res.data.map(stream => {
            //     return this.getName(stream.product_id)
            // })
            // const p_images = res.data.map(stream => {
            //     return this.getImage(stream.product_id)
            // })
            // const p_prices = res.data.map(stream => {
            //     return this.getPrice(stream.product_id)
            // })
            // this.setState({
            //     prodNames: p_names,
            //     prodImages: p_images,
            //     prodPrices: p_prices
            // })
            res.data.forEach(async (stream) => {
                this.getProductInfo(stream.product_id)
            })
            console.log(this.state)
        })
    }

    // getName = async (product) => {
    //     console.log('moltin product hit')
    //     const mProduct = await api.GetProduct(product)
    //     console.log(mProduct.data.name)
    //     return mProduct.data.name
    // }
    // getImage = async (product) => {
    //     console.log('moltin product hit')
    //     const mProduct = await api.GetProduct(product)
    //     return mProduct.included.main_images[0].link.href
    // }
    // getPrice = async (product) => {
    //     console.log('moltin product hit')
    //     const mProduct = await api.GetProduct(product)
    //     return mProduct.data.price[0].amount
    // }

    getProductInfo = async (product) => {
        console.log('moltin hit')
        const { prodNames, prodImages, prodPrices } = this.state
        console.log(prodNames, prodImages, prodPrices)
        const mProduct = await api.GetProduct(product)
        const newNames = [...prodNames, mProduct.data.name]
        const newImages = [...prodImages, mProduct.included.main_images[0].link.href]
        const newPrices = [...prodPrices, mProduct.data.price[0].amount]
        console.log(newNames, newImages, newPrices)

        // const newName = mProduct.data.name
        // const newImage = mProduct.included.main_images[0].link.href
        // const newPrice = mProduct.data.price[0].amount
        // console.log(newName, newImage, newPrice)
        // await this.setState({
        //     prodNames: [...this.state.names, newName],
        //     prodImages: [...this.state.images, newImage],
        //     prodPrices: [...this.state.prices, newPrice]
        // })

        this.setState({
            prodNames: newNames,
            prodImages: newImages,
            prodPrices: newPrices
        })
        console.log(this.state)
        return 'success'
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