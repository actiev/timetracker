import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TaskTabs from './Tabs'
import Time from '../components/Time'
import classNames from 'classnames'
import Modal from '../components/Modal'
import * as TaskActionCreators from  '../actions/index'
import StartButton from '../components/StartButton'
import StopButton from '../components/StopButton'
import TextInput from '../components/TextInput'

class TaskList extends Component {
  componentDidMount () {
    if (localStorage.getItem('timeFix')) {
      this.props.toggleButtons()
      this.tick()
    }
  }

  getTimeMsec = () => {
    return new Date().getTime()
  }

  getTimeNow = () => {
    const timeNow = new Date()

    return {
      hours: timeNow.getHours(),
      minutes: timeNow.getMinutes(),
      seconds: timeNow.getSeconds()
    }
  }

  start = () => {
    this.props.setStartTime(this.getTimeNow())

    localStorage.setItem('timeFix', this.getTimeMsec())

    this.tick()

    this.props.toggleButtons()
  }

  tick = () => {
    const msecPerMinute = 1000 * 60
    const msecPerHour = msecPerMinute * 60

    this.tickId = setInterval(() => {
      let interval = this.getTimeMsec() - localStorage.getItem('timeFix')

      let hours = Math.floor(interval / msecPerHour)
      interval = interval - (hours * msecPerHour)

      let minutes = Math.floor(interval / msecPerMinute)
      interval = interval - (minutes * msecPerMinute)

      let seconds = Math.floor(interval / 1000)

      this.props.setTimer({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      })

    }, 1000)
  }

  stop = () => {
    if (!this.props.state.timer) {
      return
    }

    const mscToDate = new Date(parseInt(localStorage.getItem('timeFix'), 10))
    const startTime = this.props.state.startTime ? this.props.state.startTime : {
      hours: mscToDate.getHours(),
      minutes: mscToDate.getMinutes(),
      seconds: mscToDate.getSeconds()
    }

    this.props.addTask({
      id: this.getTimeMsec(),
      title: this.props.state.taskTitle,
      start: startTime,
      end: this.getTimeNow(),
      speed: this.props.state.timer
    })

    clearInterval(this.tickId)

    localStorage.removeItem('timeFix')

    this.props.reset()
  }

  enterTaskTitle = e => {
    this.props.setTaskTitle(e.target.value)
  }

  render () {
    const startBtn = classNames({'hide': this.props.state.startBtn})
    const stopBtn = classNames({'hide': this.props.state.stopBtn})

    return (
      <div className="container">
        <TextInput action={this.enterTaskTitle} defaultValue={this.props.state.taskTitle}/>
        <div className="circle">
          <Time time={this.props.state.timer} />
        </div>
        <StartButton action={this.start} className={startBtn} />
        <StopButton action={this.stop} className={stopBtn} />
        <TaskTabs data={this.props.state.tasks}/>
        <Modal open={this.props.state.openModal} action={() => {this.props.openModal()}}/>
      </div>
    )
  }
}

const mapStateToProps = state => { return {state: state.app} }

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TaskActionCreators, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(TaskList)
