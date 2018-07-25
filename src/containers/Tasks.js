import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tabs from '../components/Tabs'
import Time from '../components/Time'
import classNames from 'classnames'
import Modal from '../components/Modal'
import * as TaskActionCreators from  '../actions'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

class Tasks extends Component {
  componentDidMount () {
    if (this.props.route.path !== '/') this.props.toggleTabs()

    if (localStorage.getItem('timeFix')) {
      this.tick()
      if (this.props.state.buttons) this.props.toggleButtons()
    }
  }

  componentWillUnmount () {
    clearInterval(this.tickId)
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
    localStorage.setItem('timeFix', this.getTimeMsec())

    this.tick()

    this.props.toggleButtons()
  }

  tick = () => {
    const msecPerSec = 1000
    const msecPerMinute = msecPerSec * 60
    const msecPerHour = msecPerMinute * 60

    this.tickId = setInterval(() => {
      let interval = this.getTimeMsec() - Number(localStorage.getItem('timeFix'))

      this.props.setTimer({
        hours: Math.floor(interval / msecPerHour),
        minutes: new Date(interval).getMinutes(),
        seconds: new Date(interval).getSeconds()
      })

      this.props.setEndTime(this.getTimeNow())
    }, msecPerSec)
  }

  stop = () => {
    if (!this.props.state.timer) {
      return
    }

    if (!this.props.state.taskTitle) {
      this.props.openModal()
      return
    }

    clearInterval(this.tickId)

    this.addNewTask()

    localStorage.removeItem('timeFix')

    this.props.reset()
  }

  addNewTask = () => {
    const mscToDate = new Date(Number(localStorage.getItem('timeFix')))

    const startTime = {
      hours: mscToDate.getHours(),
      minutes: mscToDate.getMinutes(),
      seconds: mscToDate.getSeconds()
    }

    this.props.addTask({
      id: this.getTimeMsec(),
      title: this.props.state.taskTitle,
      start: startTime,
      end: this.props.state.endTime,
      speed: this.props.state.timer
    })
  }

  toggleTabs = () => {
    if (this.props.state.handle) {
      this.props.toggleTabs()
      this.props.history.push('/')
    } else {
      this.props.history.push('/charts')
    }
  }

  render () {
    return (
      <div className="container">
        <TextInput action={(e) => {this.props.setTaskTitle(e.target.value)}} value={this.props.state.taskTitle}/>
        <div className="circle">
          <Time time={this.props.state.timer} />
        </div>
        <Button
          action={this.start}
          className={classNames({'hide': !this.props.state.buttons})}
          text="start"
        />
        <Button
          action={this.stop}
          className={classNames({'hide': this.props.state.buttons})}
          text="stop"
        />
        <Tabs value={this.props.state.handle} action={this.toggleTabs}/>
        <Modal open={this.props.state.openModal} action={() => {this.props.openModal()}}/>
      </div>
    )
  }
}

const mapStateToProps = state => { return {state: state.initialState} }

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TaskActionCreators, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Tasks)
