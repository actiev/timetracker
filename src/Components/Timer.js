import React, { Component } from 'react'

class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timer: props.timer
    }
  }

  componentWillReceiveProps (props) {
    this.setState({ timer: props.timer })
  }

  render () {
    const timer = this.state.timer !== null ? this.state.timer : ''

    return (
      <div className="circle">
        {this.state.timer === null ? '00:00:00' : (
          (timer.hours < 10 ? '0' + timer.hours : timer.hours) +
          ':' + (timer.minutes < 10 ? '0' + timer.minutes : timer.minutes) +
            ':' + (timer.seconds < 10 ? '0' + timer.seconds : timer.seconds))}
      </div>
    )
  }
}

export default Timer
