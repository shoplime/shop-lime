import React, { Component } from 'react'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import TwilioChat from 'twilio-chat'
import $ from 'jquery'
import './Chat.scss'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: null,
      channel: null,
    }
  }

  componentDidMount = () => {
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinGeneralChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` })
      })
  }

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Connecting...' })
      $.getJSON('/token', (token) => {
        this.setState({ username: token.identity })
        resolve(token)
      }).fail(() => {
        reject(Error('Failed to connect.'))
      })
    })
  }

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(token.jwt))
    })
  }

  getChannelMessages = () => {
    this.state.channel.getMessages()
    .then(messages => {
      console.log(messages)
      const totalMessages = messages.items.length;
      const channelMessages = messages.items.map(message => {
        return {author: message.author, body: message.body}
      })
      this.setState({
        messages: channelMessages
      })
      console.log(channelMessages)
      console.log('Total Messages:' + totalMessages);
    })
  }

  joinGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        console.log(chatClient)
        chatClient.getChannelByUniqueName('lime').then((channel) => {
          console.log(channel)
          this.addMessage({ body: 'Joining general channel...' })
          this.setState({ channel })
          console.log(this.state)
          channel.join().then(() => {
            this.addMessage({ body: `Joined general channel as ${this.state.username}` })
            this.getChannelMessages()
            window.addEventListener('beforeunload', () => channel.leave())
          }).catch(() => reject(Error('Could not join general channel.')))

          resolve(channel)
        }).catch(() => this.createGeneralChannel(chatClient))
      }).catch(() => reject(Error('Could not get channel list.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Creating general channel...' })
      chatClient
        .createChannel({ uniqueName: 'lime', friendlyName: 'Lime Chat' })
        .then(() => this.joinGeneralChannel(chatClient))
        .catch(() => reject(Error('Could not create lime channel.')))
    })
  }

  addMessage = (message) => {
    const messageData = { ...message, me: message.author === this.state.username }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
    console.log(this.state)
  }

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text)
    }
  }

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body })
    })

    // channel.on('memberJoined', (member) => {
    //   this.addMessage({ body: `${member.identity} has joined the channel.` })
    // })

    // channel.on('memberLeft', (member) => {
    //   this.addMessage({ body: `${member.identity} has left the channel.` })
    // })
  }

  render() {
    return (
      <div className='chat-back'>
        <div className="Chat">
          <MessageList messages={this.state.messages} />
          <MessageForm onMessageSend={this.handleNewMessage} />
        </div>
      </div>
    )
  }
}

export default Chat
