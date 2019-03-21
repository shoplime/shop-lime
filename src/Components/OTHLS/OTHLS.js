import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class OTHLS extends Component {
    constructor(props){
        super(props)

        this.state = {
            hls: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        }
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render(){
        const { hls } = this.state
        return(
            <div>
                <input onChange={e => {this.handleChange('hls', e.target.value)}} value={hls} />
                <ReactPlayer
                    url={hls}
                    playing={true}
                    controls={true}
                    volume={0.8}
                    muted={false}
                    pip={false}
                    config={{
                        file: {
                            forceHLS: true
                        }
                    }}
                />
            </div>
        )
    }
}

export default OTHLS