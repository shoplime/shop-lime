import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MessageForm.scss'
const Filter = require('bad-words')
const filter = new Filter();

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.input.focus()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    // console.log(filter.clean(this.input.value))
    this.props.onMessageSend(filter.clean(this.input.value))
    this.input.value = ""
  }

  render() {
    return (
      <form className="MessageForm" onSubmit={this.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            ref={(node) => (this.input = node)}
            placeholder="Enter your message..."
          />
        </div>
        <div className="button-container">
          <button type="submit">
            {/* <Send style={{color: '#fff'}}/> */}
            Send
          </button>
        </div>
      </form>
    )
  }
}

export default MessageForm
