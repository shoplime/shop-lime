import React, { useState, Suspense, useEffect, memo } from 'react'
import ReactPlayer from 'react-player';
import Chat from './../Chat/Chat'
import { Chat as ChatIcon } from '@material-ui/icons'
import Close from '@material-ui/icons/Close'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import ViewCounter from '../ViewCounter/ViewCounter'


const MobileVideo = (props) => {
    const [muted, setMuted] = useState(true);
    const [chatDisplay, setChatDisplay] = useState(false);
    const {hls, archive_id, status} = props.stream

    const toggleMuted = () => {
        setMuted(muted === false ? true : false)
    };
    const toggleChat = () => {
        setChatDisplay(chatDisplay === false ? true : false)
    };

    return(
        <div>
            {
                (status === 'live' ?
                <div className='m-player-wrapper'>
                    <ReactPlayer
                    className='m-react-player'
                    url={hls}
                    playing={true}
                    loop={true}
                    controls={false}
                    volume={0.8}
                    muted={muted}
                    pip={false}
                    width={'100%'}
                    height={'100%'}
                    config={{
                        file: {
                            forceHLS: true
                        }
                    }}
                    />
                    <div className='m-overlay'>
                        <button onClick={toggleMuted} className='icon-button'>{(muted ? <VolumeOff className='mute'/> : <VolumeUp className='mute'/> )}</button>
                        <div className='right-overlay'>
                            <button onClick={toggleChat} className='icon-button'>{(chatDisplay ? <Close className='chat-toggle'/> : <ChatIcon className='chat-toggle'/> )}</button>                   
                            {chatDisplay && <div className='m-chat-wrapper'><Chat /></div>}
                        </div>
                    </div>
                </div>
                :
                <div className='m-player-wrapper'>
                    <ReactPlayer
                    className='m-react-player'
                    url={`https://lime-archive.s3.amazonaws.com/46286302/${archive_id}/archive.mp4`}
                    playing={true}
                    loop={true}
                    controls={false}
                    volume={0.8}
                    muted={muted}
                    pip={false}
                    width={'100%'}
                    height={'100%'}
                    />
                    <div className='m-overlay'>
                        <button onClick={toggleMuted} className='icon-button'>{(muted ? <VolumeOff className='mute'/> : <VolumeUp className='mute'/> )}</button>
                        <div className='right-overlay'>
                            <button onClick={toggleChat} className='icon-button'>{(chatDisplay ? <Close className='chat-toggle'/> : <ChatIcon className='chat-toggle'/> )}</button>                   
                            {chatDisplay && <div className='chat-wrapper'><Chat /></div>}
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default MobileVideo