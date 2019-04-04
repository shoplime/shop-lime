import React, { Component } from 'react';
import axios from 'axios'
import { OTSession, OTPublisher } from 'opentok-react';
import './OpenTok.scss'
import MobileView from './../MobileView/MobileView'
import Analytics from '../Analytics/Analytics'
import Button from '@material-ui/core/Button';
import Chat from './../Chat/Chat'

class OpenTok extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archive: '',
            archiveUrl: 'https://s3.us-west-1.amazonaws.com/lime-archive/46286302/a26e1bad-7288-410c-bb7a-79c722577558/archive.mp4?response-content-disposition=inline&X-Amz-Security-Token=AgoGb3JpZ2luEDkaCXVzLXdlc3QtMSKAAh0m8MTND3mx3BV6UznV%2BVf6DpBKhYWlp91T2NjItqHd6ZLheeDl3Ig%2BQaguYSmn%2Bl26WT4I0j23mUDbJC1hJeBV%2Fw%2F0fFh%2FzYkY7hPrNPvgEA%2FeyUdOantKoAO3hv1LIDxJildz1t7PJYah51Oe6tUXycv6DJE%2BBWCRtHe0Z0X%2FdAv2lLoLS7hBfpHT6dY%2FECwq02XcZOf1jPWIMVZMQr05sKS5ch0LqKwe0C6SRncX9tH7InfmNNd273daobUqUneUCe%2BU%2BlfC1B9ITcAXwpmjOQHfiMshbnXhtHT5CRI3FarOkNhzTL12GYUkHQNNer%2BxFin%2BuD%2Bysh%2BhVLW9Cu4q5AMIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwNzc5NzU0MDUzMDIiDFtKV2F%2FixJq19K5Siq4A2wXc4ZJzb6lrlBak6Aj2A1frSj7hwY1sSMLFpZCnMejMODMxbLNpQaYSAwu0azpSD%2BJ3l5ZIQlGV9kaWmfM7zs8AATFQVSC2pSNPB6qLno9IS9jXOLOs572%2BlNaPk490O4onNHC7cGvQT%2BfoHbjOyMRGJffnGWFJNbZfRoypbU9Sg5yQvtQ9Swm2fOnaj5GcLNKwqVfPfsNWJJxvPUGqsts7xcCtxOjBNMo7RpVfFroAc%2Bkps%2Bn7TMgNJ6%2BxdnOZzuOa2615r13UwdjRjHS%2FFWqw9q%2BMWxdHcJbVw3dfyuhdQurXaRlQUMmThQN4eCRejFBCEmsVZ8nAvZzYVRrEQqO2I0DZP5lcoJz2lPm%2FB2QyAqcvEvuVvUBkTc1Tri0EPC6fVsADPAzTFc2usdjlf%2FKiAYZaBtLD185UoSMW2Ira4HC%2FKakfBuNQgBY9TB18X4nwGthU7e3Ft5kRNkYL%2BkDTLJVV6VUfhGFwZXF3VNtWX34pkpp1yIin4cafoQ5jZNYpj5bmY5nz%2F%2Ffn%2FNfsuVYzje2U84gNsAXFZeeBuN5anDAR%2FJIPl2CMtfUC%2FQxMeyaUOZ5C9a3MM200%2BQF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190322T165614Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAREJ5SIL3L6BPIIWR%2F20190322%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=b8d04900c2cf78c62f41e94fe217dad2fe64ecabfa849e2fb2f244a2ee78e099',
            livestreaming: false
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

    // componentWillUnmount() {
    //     this.sessionHelper.disconnect();
    // }

    // createSession = () => {
    //     axios.get('/createSession')
    //     .then(res => {
    //         console.log(res)
    //         this.setState({
    //             sessionId: res.data
    //         })
    //         console.log(this.state)
    //     })
    // }

    // generateToken = () => {
    //     axios.get(`/generateToken/${this.props.sessionId}`)
    //     .then(res => {
    //         console.log(res)
    //         this.setState({
    //             token: res.data
    //         })
    //         console.log(this.state)
    //     })
    // }

    startBroadcast = () => {
        const {streamName, product, sessionId, imgUrl} = this.props;
         
        axios
            .get(`/startBroadcast/${this.props.sessionId}`)
            .then(res => {
            axios
                .post('/admin/newStream', {
                    name: streamName,
                    session_id: sessionId, 
                    product_id: product,
                    hls: res.data.broadcastUrls.hls,
                    broadcast_id: res.data.id,
                    status: 'live',
                    created_at: res.data.createdAt,
                    url: imgUrl
                    })

            })
            .catch(err => {
            console.log(err);
            })
    }
    
    stopBroadcast = () => {
        axios.get('/stopBroadcast')
        .then(res => {
            axios.put('/updateStreamStatus', {
                session_id: res.data.sessionId,
                status: 'active'
            })
            .then(() => console.log('status updated'))
            console.log('broadcast ended')
        })
    }

    startArchive = () => {
        const data = {
            sessionId: this.props.sessionId,
            resolution: '1280x720',
            outputMode: 'composed'
        }
        const headers = {
            "Content-Type": "application/json"
        }
        axios.post('/startArchive', data, {headers: headers})
        .then(res => {
            this.setState({
                archive: res.data.id
            })
            axios.put(`/saveArchive/`, {
                session_id: this.props.sessionId,
                archive_id: res.data.id
            })
        })
        .catch(err => {alert('Error starting archive')})
    }

    stopArchive = () => {
        axios.get(`/stopArchive?archiveId=${this.state.archive}`)
        .then(res => {
            console.log('archiving stopped')
        })
        .catch(error => {
            alert('Error stopping archive')
        })
    }

    startLivestream = () => {
        const {streamName, product, sessionId, imgUrl} = this.props; 
        axios
            .get(`/startBroadcast/${this.props.sessionId}`)
            .then(res => {
                axios
                    .post('/admin/newStream', {
                        name: streamName,
                        session_id: sessionId, 
                        product_id: product,
                        hls: res.data.broadcastUrls.hls,
                        broadcast_id: res.data.id,
                        status: 'live',
                        created_at: res.data.createdAt,
                        url: imgUrl
                        })
                })
                .then(() => {
                    const data = {
                        sessionId: this.props.sessionId,
                        resolution: '1280x720',
                        outputMode: 'composed'
                    }
                    const headers = {
                        "Content-Type": "application/json"
                    }
                    axios.post('/startArchive', data, {headers: headers})
                    .then(res => {
                        this.setState({
                            archive: res.data.id,
                            livestreaming: true
                        })
                        axios.put(`/saveArchive/`, {
                            session_id: this.props.sessionId,
                            archive_id: res.data.id
                        })
                    })
                    .catch(err => {alert('Error starting archive')})
                })
            .catch(err => {
            console.log(err);
            })  
    }

    stopLivestream = () => {
        axios.get(`/stopArchive?archiveId=${this.state.archive}`)
        .then(res => {
            console.log('archiving stopped')
            axios.get('/stopBroadcast')
            .then(res => {
                axios.put('/updateStreamStatus', {
                    session_id: res.data.sessionId,
                    status: 'active'
                })
                .then(() => console.log('status updated'))
                console.log('broadcast ended')
                this.setState({
                    livestreaming: false
                })
            })
        })
        .catch(error => {
            alert('Error stopping archive')
        })
    }

    render() {
        const {apiKey, sessionId, token } = this.props;
        const { livestreaming } = this.state;
        return (
            <div>
                <div>
                    <div className='preview-wrapper'>
                        <OTSession apiKey={apiKey} sessionId={sessionId} token={token} >
                            <div  className="stream-container">
                                <div className='desktop-preview'>
                                    <OTPublisher  properties={{ height: '360px', width: '640px'}}/>
                                    <div className='preview-overlay'>
                                        {
                                            (livestreaming ?
                                                <Button variant="outlined" color="secondary" style={{margin: '15px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} onClick={() => {this.stopLivestream()}} >End Livestream</Button>
                                                :
                                                <Button variant="outlined" color="primary" style={{margin: '15px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} onClick={() => {this.startLivestream()}} >Start Livestream</Button>
                                                )
                                            }
                                        <div className='chat-wrapper'><Chat /></div>
                                    </div>
                                </div>
                                <MobileView/>
                            </div>
                        </OTSession>
                        
                    </div>
                    
                </div>
                <div>
                    <Analytics/>
                </div>
            </div>
        );
    }
}

export default OpenTok;
