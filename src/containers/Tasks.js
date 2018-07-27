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
  componentWillMount () {
    const { route, toggleTabs, refreshTimer } = this.props

    if (route.path !== '/') toggleTabs()

    refreshTimer()
  }

  getTimeMsec = () => {
    return new Date().getTime()
  }

  start = () => {
    const { startTimer, start } = this.props

    start()

    startTimer()
  }

  stop = () => {
    const { state, openModal, reset } = this.props

    if (!state.timer) {
      return
    }

    if (!state.taskTitle) {
      openModal()
      return
    }

    this.addNewTask()

    clearInterval(state.timerId)

    reset()
  }

  addNewTask = () => {
    const { state, addTask } = this.props

    const mscToDate = new Date(Number(state.startTime))

    const startTime = {
      hours: mscToDate.getHours(),
      minutes: mscToDate.getMinutes(),
      seconds: mscToDate.getSeconds()
    }

    addTask({
      id: this.getTimeMsec(),
      title: state.taskTitle,
      start: startTime,
      end: state.endTime,
      spend: state.timer
    })
  }

  toggleTabs = () => {
    const { state, toggleTabs, history } = this.props

    if (state.handle) {
      toggleTabs()

      history.push('/')
    } else {
      history.push('/charts')
    }
  }

  render () {
    const { state, setTaskTitle, openModal } = this.props

    return (
      <div className="container">
        <TextInput action={(e) => {setTaskTitle(e.target.value)}} value={state.taskTitle}/>
        <div className="circle">
          <Time time={state.timer} />
        </div>
        <Button
          action={this.start}
          className={classNames({'hide': !state.buttons})}
          text="start"
        />
        <Button
          action={this.stop}
          className={classNames({'hide': state.buttons})}
          text="stop"
        />
        <Tabs value={state.handle} action={this.toggleTabs}/>
        <Modal open={state.openModal} action={() => {openModal()}}/>
      </div>
    )
  }
}

const mapStateToProps = state => { return {state: state.initialState} }

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TaskActionCreators, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Tasks)