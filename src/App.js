import React, { Component } from 'react'
import SimpleTabs from './Components/Tabs'
import './assets/App.css'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Timer from './Components/Timer'
import classNames from 'classnames'
import update from 'immutability-helper'
import Modal from './Components/Modal'

const styles = ({
  button: {
    color: '#344dc4',
    background: '#fff',
    minWidth: 65,
    height: 40,
    marginBottom: 18,
    '&:hover': {
      backgroundColor: '#eaf6ff'
    }
  },
  input: {
    width: 255,
    color: '#344dc4',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 26
  }
})

class App extends Component {
  state = {
    stopBtn: !!localStorage.getItem('timeFix'),
    startBtn: !localStorage.getItem('timeFix'),
    timer: null,
    newTaskTitle: '',
    openModal: false,
    data: []
  }

  tickInterval = null

  getTimeMsec = () => {
    return new Date().getTime()
  }

  getTime = () => {
    const timeNow = new Date()

    return {
      hours: timeNow.getHours(),
      minutes: timeNow.getMinutes(),
      seconds: timeNow.getSeconds()
    }
  }

  start = () => {
    localStorage.setItem('timeFix', this.getTimeMsec())

    this.setState({
      stopBtn: true,
      startBtn: false,
      startTime: this.getTime()
    })
  }

  tick = () => {
    const msecPerMinute = 1000 * 60
    const msecPerHour = msecPerMinute * 60

    this.tickInterval = setTimeout(() => {
      let interval = this.getTimeMsec() - localStorage.getItem('timeFix')

      let hours = Math.floor(interval / msecPerHour)
      interval = interval - (hours * msecPerHour)

      let minutes = Math.floor(interval / msecPerMinute)
      interval = interval - (minutes * msecPerMinute)

      let seconds = Math.floor(interval / 1000)

      this.setState({
        timer: {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      })
    }, 1000)
  }

  stop = () => {
    const mscToDate = new Date(parseInt(localStorage.getItem('timeFix'), 10))
    const startTime = this.state.startTime ? this.state.startTime : {
        hours: mscToDate.getHours(),
        minutes: mscToDate.getMinutes(),
        seconds: mscToDate.getSeconds()
      }

    const addNewTask = update(this.state.data, {
      $push : [{
        id: this.state.data.length + 1,
        title: this.state.newTaskTitle,
        start: {
          hours: startTime.hours,
          minutes: startTime.minutes,
          seconds: startTime.seconds
        },
        end: this.getTime(),
        speed: this.state.timer
      }]
    })

    this.setState({
      startBtn: true,
      stopBtn: false,
      data: addNewTask,
      newTaskTitle: '',
      timer: null
    })

    clearInterval(this.tickInterval)
    localStorage.removeItem('timeFix')
  }

  enterTaskTitle = (e) => {
    this.setState({
      newTaskTitle: e.target.value
    })
  }

  render () {
    const { classes } = this.props
    const startBtn = classNames({'hide': !this.state.startBtn})
    const stopBtn = classNames({'hide': !this.state.stopBtn})

    if (localStorage.getItem('timeFix')) this.tick()

    return (
      <div className="container">
        <Input
          className={classes.input}
          name="task" value={this.state.newTaskTitle}
          placeholder="Enter task title"
          onChange={this.enterTaskTitle}
        />
        <Timer timer={this.state.timer}/>
        <Button variant="contained" onClick={this.start} className={classes.button + ' ' + startBtn}>Start</Button>
        <Button variant="contained" onClick={this.stop} className={classes.button + ' ' + stopBtn}>Stop</Button>
        <SimpleTabs data={this.state.data}/>
        <Modal open={this.state.openModal} />
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
