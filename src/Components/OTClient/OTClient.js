import React, { Component } from 'react';
import axios from 'axios'
import { OTSession, OTStreams, OTSubscriber } from 'opentok-react';

class OTClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '',
            sessionId: '',
            token: ''
        }

        this.subscriberProperties = {
            preferredFrameRate: 15,
            showControls: false
        };
       
        this.subscriberEventHandlers = {
            videoDisabled: event => {
              console.log('Subscriber video disabled!');
            },
            videoEnabled: event => {
              console.log('Subscriber video enabled!');
            }
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

    handleChange = (key, val) => {
        this.setState({
            [key]: val
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

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }

    render() {
        const { apiKey, sessionId, token } = this.state;
        return (
            <div>
                {
                    (token ?
                    <div>
                        <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
                        <OTStreams>
                            <OTSubscriber properties={{ width: '100%', height: '500px' }}/>
                        </OTStreams>
                        </OTSession>
                    </div>
                    :
                    <div>
                        <input onChange={e => this.handleChange('sessionId', e.target.value)} value={this.state.sessionId}/>
                        <button onClick={() => {this.generateToken()}} >Generate Token</button>                        
                    </div>
                    )
                }
            </div>
            
        );
    }
}

export default OTClient;
