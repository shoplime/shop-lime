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
            token: '',
            archive: '',
            archiveUrl: 'https://s3.us-west-1.amazonaws.com/lime-archive/46286302/a26e1bad-7288-410c-bb7a-79c722577558/archive.mp4?response-content-disposition=inline&X-Amz-Security-Token=AgoGb3JpZ2luEDkaCXVzLXdlc3QtMSKAAh0m8MTND3mx3BV6UznV%2BVf6DpBKhYWlp91T2NjItqHd6ZLheeDl3Ig%2BQaguYSmn%2Bl26WT4I0j23mUDbJC1hJeBV%2Fw%2F0fFh%2FzYkY7hPrNPvgEA%2FeyUdOantKoAO3hv1LIDxJildz1t7PJYah51Oe6tUXycv6DJE%2BBWCRtHe0Z0X%2FdAv2lLoLS7hBfpHT6dY%2FECwq02XcZOf1jPWIMVZMQr05sKS5ch0LqKwe0C6SRncX9tH7InfmNNd273daobUqUneUCe%2BU%2BlfC1B9ITcAXwpmjOQHfiMshbnXhtHT5CRI3FarOkNhzTL12GYUkHQNNer%2BxFin%2BuD%2Bysh%2BhVLW9Cu4q5AMIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwNzc5NzU0MDUzMDIiDFtKV2F%2FixJq19K5Siq4A2wXc4ZJzb6lrlBak6Aj2A1frSj7hwY1sSMLFpZCnMejMODMxbLNpQaYSAwu0azpSD%2BJ3l5ZIQlGV9kaWmfM7zs8AATFQVSC2pSNPB6qLno9IS9jXOLOs572%2BlNaPk490O4onNHC7cGvQT%2BfoHbjOyMRGJffnGWFJNbZfRoypbU9Sg5yQvtQ9Swm2fOnaj5GcLNKwqVfPfsNWJJxvPUGqsts7xcCtxOjBNMo7RpVfFroAc%2Bkps%2Bn7TMgNJ6%2BxdnOZzuOa2615r13UwdjRjHS%2FFWqw9q%2BMWxdHcJbVw3dfyuhdQurXaRlQUMmThQN4eCRejFBCEmsVZ8nAvZzYVRrEQqO2I0DZP5lcoJz2lPm%2FB2QyAqcvEvuVvUBkTc1Tri0EPC6fVsADPAzTFc2usdjlf%2FKiAYZaBtLD185UoSMW2Ira4HC%2FKakfBuNQgBY9TB18X4nwGthU7e3Ft5kRNkYL%2BkDTLJVV6VUfhGFwZXF3VNtWX34pkpp1yIin4cafoQ5jZNYpj5bmY5nz%2F%2Ffn%2FNfsuVYzje2U84gNsAXFZeeBuN5anDAR%2FJIPl2CMtfUC%2FQxMeyaUOZ5C9a3MM200%2BQF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190322T165614Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAREJ5SIL3L6BPIIWR%2F20190322%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=b8d04900c2cf78c62f41e94fe217dad2fe64ecabfa849e2fb2f244a2ee78e099'
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

    startPublish = () => {
        axios.get(`/startPublish`)
        .then(res => {
            const { sessionId, token } = res.data
            this.setState({
                sessionId: sessionId,
                token: token
            })
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

    startArchive = () => {
        const data = {
            sessionId: `${this.state.sessionId}`,
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
            console.log(this.state)
        })
        .catch(err => {alert('Error starting archive')})
    }

    stopArchive = () => {
        axios.get(`/stopArchive?archiveId=${this.state.archive}`)
        .then(res => {
            console.log('archiving stopped')
            // const videoLink = document.createElement('a')
            // const videoLinkText = document.createTextNode('Click here to view Archive');
            // videoLink.appendChild(videoLinkText)
            // videoLink.href = `/viewArchive/${res.data.id}`
            // document.getElementById('links').appendChild(videoLink)
        })
        .catch(error => {
            alert('Error stopping archive')
        })
    }

    //make sure public videos can only be retrieve and not posted
    //check s3 restrictions and make sure you wont get charged to much
    //add boradcasting parts to form and have broadcast dashboard with stop archive and broadcast
    //figure archive table and connection to products
    saveArchive = () => {
        const { apiKey, archiveId } = this.state
        axios.post('/saveArchive', {
            archiveUrl: `https://lime-archive.s3.amazonaws.com/${apiKey}/${archiveId}/archive.mp4`
        })
    }

    render() {
        const { apiKey, sessionId, token } = this.state;
        return (
            <div>
                {/* <div className='player-container'>
                    <ReactPlayer
                        className='react-player'
                        url={this.state.archiveUrl}
                        playing={true}
                        controls={true}
                        volume={0.8}
                        muted={true}
                        pip={false}
                        width={'100%'}
                        height={'100%'}
                    />
                </div> */}
                {
                    (token ?
                    <div>
                        <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
                            <div  className="stream-container">
                                <OTPublisher  properties={{ height: '360px', width: '640px'}}/>
                                <OTPublisher  properties={{ height: '320px', width: '180px'}}/>
                            </div>
                        </OTSession>
                        <button onClick={() => {this.startBroadcast()}} >Start Broadcast</button>
                        <button onClick={() => {this.stopBroadcast()}} >End Broadcast</button>
                        <button onClick={() => {this.startArchive()}}>Start Archive</button>
                        <button onClick={() => {this.stopArchive()}}>Stop Archive</button>
                    </div>
                    :
                    <div>
                        <h4>{this.state.sessionId}</h4>
                        <button onClick={() => {this.createSession()}} >Create Session</button>
                        <h4>{this.state.token}</h4>
                        <button onClick={() => {this.generateToken()}} >Generate Token</button>
                        <button onClick={() => {this.startPublish()}} >Start Publish - Session and Token</button>
                    </div>)
                }
            </div>
        );
    }
}

export default OpenTok;
