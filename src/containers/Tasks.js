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
  constructor(props) {
    super(props)

    this.state = {
      openModal: false,
      tabs: false,
      taskTitle: '',
      buttons: true
    }
  }

  componentWillMount () {
    const { route, refreshTimer, state } = this.props

    if (route.path !== '/') this.setState({tabs: !this.state.tabs})

    if (!state.timerId) {
      refreshTimer()
    }
  }

  getTimeMsec = () => {
    return new Date().getTime()
  }

  start = () => {
    const { start, state } = this.props

    if (state.startTime) return

    start(this.state.taskTitle)
  }

  stop = () => {
    const { state, reset } = this.props
    const title = state.taskTitle || this.state.taskTitle

    if (!state.timer) {
      return
    }

    if (!title) {
      this.setState({openModal: !this.state.openModal})

      return
    }

    this.addNewTask()

    this.setState({
      taskTitle: ''
    })

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

    const title = state.taskTitle || this.state.taskTitle

    addTask({
      id: this.getTimeMsec(),
      title: title,
      start: startTime,
      end: state.endTime,
      spend: state.timer
    })
  }

  toggleTabs = () => {
    const { history } = this.props

    if (this.state.tabs) {
      this.setState({tabs: !this.state.tabs})

      history.push('/')
    } else {
      history.push('/charts')
    }
  }

  setTaskTitle = (e) => {
    this.setState({
      taskTitle: e.target.value
    })
  }

  closeModal = () => {
    this.setState({openModal: !this.state.openModal})
  }

  render () {
    const { state } = this.props

    return (
      <div className="container">
        <TextInput action={this.setTaskTitle} value={state.taskTitle || this.state.taskTitle} />
        <div className="circle">
          <Time time={state.timer} />
        </div>
        <Button
          action={this.start}
          className={classNames({'start': true, 'hide': state.timer ? true : !this.state.buttons})}
          text="start"
        />
        <Button
          action={this.stop}
          className={classNames({'stop': true, 'hide': state.timer ? false : this.state.buttons})}
          text="stop"
        />
        <Tabs value={this.state.tabs} action={this.toggleTabs}/>
        <Modal open={this.state.openModal} action={this.closeModal}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({state: state.initialState})

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TaskActionCreators, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Tasks)