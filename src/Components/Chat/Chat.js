import React, {Component} from 'react';
import SendBird from 'sendbird'

const sb = new SendBird({appId: process.env.REACT_APP_SB_APP_ID});

class Chat extends Component{
    constructor(props){
        super(props)

        this.state = {
            userId: '',
            nickname: '',
            showChat: false
        }
    }

    handleChange(key, val){
        this.setState({
            [key]: val
        })
    }

    connectUser = () => {
        const { userId, nickname } = this.state;
        sb.connect(userId, (user, error) => {
            if (error) {
                console.log({ error });
            } else {
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        console.log({ error });
                    } else {
                        this.setState({
                            userId: '',
                            nickname: '',
                            showChat: true
                        });
                    }
                })
            }
        })
    }

    createChannel = () => {
        sb.OpenChannel.createChannel(function(openChannel, error) {
            if (error) {
                return;
            }
        })
    }

    // enterChannel = () => {
    //     sb.OpenChannel.getChannel(CHANNEL_URL, function(openChannel, error) {
    //         if (error) {
    //             return;
    //         }
        
    //         openChannel.enter(function(response, error) {
    //             if (error) {
    //                 return;
    //             }
    //         })
    //     }); 
    // }

    render(){
        return(
            <div>
                Chat
                {
                    (!this.state.showChat ?
                    <div>
                        Enter User ID:
                        <input onChange={e => {this.handleChange('userId', e.target.value)}} value={this.state.userId} />
                        Enter Nickname:
                        <input onChange={e => {this.handleChange('nickname', e.target.value)}} value={this.state.nickname} />
                        <button onClick={() => {this.connectUser()}}>Connect User</button>
                    </div>
                    :
                    <div>
                        {this.state.nickname}
                    </div>
                    )
                }
                <button onClick={() => {this.createChannel()}}>Create Channel</button>
                {/* <button onClick={this.enterChannel()}>Enter Channel</button> */}
            </div>
        )
    }
}

export default Chat
// const Chat = () => (

// );

// export default Chat;
