import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import Button from '../components/Button'
import * as TaskActionCreators from  '../actions'
import { bindActionCreators } from 'redux'

class TasksChart extends Component {
  constructor(props) {
    super(props)

    this.minPerHour = 60
    this.hourStartDay = 0
    this.hourFinishDay = 23

    console.log(props)
  }

  shouldComponentUpdate(nextProps) {
    const { state } = this.props

    return nextProps.state.tasks !== state.tasks
  }

  createChart = (tasks) => {
    const { state } = this.props

    tasks = tasks || state.tasks

    const data = []

    for (let i = this.hourStartDay; i <= this.hourFinishDay; i++) {
      data.push({hour: i})
    }

    tasks.forEach(task => {
      let hours = task.start.hours

      if (hours === task.end.hours) {
        data[hours][task.title] = task.end.minutes - task.start.minutes
        return
      }

      data[hours][task.title] = this.minPerHour - task.start.minutes

      for (++hours; hours < task.end.hours; hours++){
        data[hours][task.title] = this.minPerHour
      }

      data[task.end.hours][task.title] = task.end.minutes
    })

    return data
  }

  generateTasks = () => {
    const { removeTasks, setRandomTasks } = this.props

    removeTasks()

    const newTasks = []
    const randomTasksCount = 10
    const minDuration = 10
    const maxDuration = 90
    const seconds = 0

    for(let i = 1; i <= randomTasksCount; i++) {
      let randMinutesStart = Math.floor(Math.random() * 58)
      let randHoursStart = Math.floor(Math.random() * (this.hourFinishDay - this.hourStartDay)) + this.hourStartDay
      let randomDuration = Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration

      let hours = 0
      let duration = {}
      let end = {}

      let start = {
        hours: randHoursStart,
        minutes: randMinutesStart,
        seconds: seconds
      }

      if (randomDuration > this.minPerHour) {
        duration = {
          hours: ++hours,
          minutes: randomDuration - this.minPerHour,
          seconds: seconds
        }
      } else {
        duration = {
          hours: hours,
          minutes: randomDuration,
          seconds: seconds
        }
      }

      if (randMinutesStart + duration.minutes > this.minPerHour) {
        end = {
          hours: ++hours + randHoursStart,
          minutes: (randMinutesStart + duration.minutes) - this.minPerHour,
          seconds: seconds
        }
      } else {
        end ={
          hours: randHoursStart + duration.hours,
          minutes: randMinutesStart + duration.minutes,
          seconds: seconds
        }
      }

      newTasks.push({
        id: i,
        title: `task${i}`,
        start: start,
        end: end,
        spend: duration
      })
    }

    setRandomTasks(newTasks)
  }

  generateColor = () => {
    return `#${Math.random().toString(16).substr(-6)}`
  }

  render () {
    const { state } = this.props

    return (
      <div className="charts">
        <BarChart width={1024} height={400} data={this.createChart()} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="hour"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          {state.tasks.map(task => (<Bar dataKey={task.title} stackId="a" key={task.id} fill={this.generateColor()} />))}
        </BarChart>
        <div className="row">
          <Button text="generate" action={this.generateTasks} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => { return {state: state.initialState} }

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TaskActionCreators, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(TasksChart)
