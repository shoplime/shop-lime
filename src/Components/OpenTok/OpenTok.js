import React, { Component } from 'react';
import axios from 'axios'
import { OTSession, OTPublisher } from 'opentok-react';
import './OpenTok.scss'

class OpenTok extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '',
            sessionId: '',
            token: ''
        };
    }

    componentWillMount() {
        axios.get('/getKey')
        .then(res => {
            this.setState({
                apiKey: res.data
            })
        })
    }

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }

    createSession = () => {
        axios.get('/createSession')
        .then(res => {
            console.log(res)
            this.setState({
                sessionId: res.data
            })
            console.log(this.state)
        })
    }

    generateToken = () => {
        axios.get(`/generateToken/${this.state.sessionId}`)
        .then(res => {
            console.log(res)
            this.setState({
                token: res.data
            })
            console.log(this.state)
        })
    }

    startBroadcast = () => {
        axios.get(`/startBroadcast/${this.state.sessionId}`)
        .then(res => console.log('broadcast started'))
    }
    
    stopBroadcast = () => {
        axios.get('/stopBroadcast')
        .then(res => console.log('broadcast ended'))
    }

    render() {
        const { apiKey, sessionId, token } = this.state;
        return (
            <div>
                {
                    (token ?
                    <div>
                        <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
                            <div  className="stream-container">
                                <OTPublisher  properties={{ width: '100%', fitMode: 'cover' }}/>
                            </div>
                        </OTSession>
                        <button onClick={() => {this.startBroadcast()}} >Start Broadcast</button>
                        <button onClick={() => {this.stopBroadcast()}} >End Broadcast</button>
                    </div>
                    :
                    <div>
                        <h4>{this.state.sessionId}</h4>
                        <button onClick={() => {this.createSession()}} >Create Session</button>
                        <h4>{this.state.token}</h4>
                        <button onClick={() => {this.generateToken()}} >Generate Token</button>
                    </div>)
                }
            </div>
        );
    }
}

export default OpenTok;
