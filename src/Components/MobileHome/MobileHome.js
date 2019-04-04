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
            res.data.forEach(async (stream) => {
                await this.getProductInfo(stream.product_id)
                .then((mProduct) => {
                    const newStreams = [...this.state.streams]
                    newStreams.map(stream => {
                        if(stream.product_id === mProduct.data.id){
                            return Object.assign(stream, {pName: mProduct.data.name, pImg: mProduct.included.main_images[0].link.href, pPrice: mProduct.data.price[0].amount})
                        } else {
                            return stream
                        }
                    })
                    this.setState({
                        streams: newStreams
                    })
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
                                <MobileCard stream={stream} />
                            )
                        })
                    }
                </SwipeableViews>
            </div>
        )
    }
}

export default MobileHome