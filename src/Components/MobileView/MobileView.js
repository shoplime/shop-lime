import React, { Component } from 'react';
import { OTSession, OTPublisher } from 'opentok-react';
import './MobileView.scss'
import phone from './../../iPhone.png'
import axios from 'axios'


//This is a secondary published stream that has its own unique session and token
//It is used purely to show to publish views. 
class MobileView extends Component{
    constructor(props){
        super(props)
        this.state = {
            apiKey: '',
            sessionId: '',
            token: ''
        }
    }

    componentDidMount(){
        axios.get(`/startPublish`)
        .then(res => {
            const { apiKey, sessionId, token } = res.data
            console.log(res.data)
            this.setState({
                apiKey: apiKey,
                sessionId: sessionId,
                token: token
            })
        })
    }

    render(){
        const {apiKey, sessionId, token} = this.state;
        return(
            <div>
                {token && 
                <OTSession apiKey={apiKey} sessionId={sessionId} token={token} >
                        <div className='mobile-preview'>
                            <OTPublisher properties={{ height: '370px', width: '180px'}} />
                            <img className='phone' src={phone} alt='iphone' />
                        </div>
                </OTSession>
                }
            </div>
        )
    }
}

export default MobileView