import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import Button from '../components/Button'
import * as TaskActionCreators from  '../actions'
import {bindActionCreators} from 'redux'

class TasksChart extends Component {
  createChart = () => {
    const data = []

    const minPerHour = 60
    const hoursInDay = 23

    for (let i = 0; i <= hoursInDay; i++) {
      data.push({hour: i})
    }

    this.props.state.tasks.forEach(task => {
      let hours = task.start.hours

      if (hours === task.end.hours) {
        data[hours][task.title] = task.end.minutes - task.start.minutes
        return
      }

      data[hours][task.title] = minPerHour - task.start.minutes

      for (++hours; hours < task.end.hours; hours++){
        data[hours][task.title] = minPerHour
      }

      data[task.end.hours][task.title] = task.end.minutes
    })

    return data
  }

  generateTasks = () => {
    this.props.removeTasks()

    for(let i = 1; i <= 8; i++) {
      this.props.addTask({
        id: i,
        title: 'task' + i,
        start: {
          hours: i,
          minutes: i*10
        },
        end: {
          hours: i,
          minutes: (i+1)*10
        }
      })
    }
  }

  generateColor = () => {
    return '#' +  Math.random().toString(16).substr(-6)
  }

  render () {
    return (
      <div className="charts">
        <BarChart width={1024} height={400} data={this.createChart()} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="hour"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          {this.props.state.tasks.map(task => (<Bar dataKey={task.title} stackId="a" key={task.id} fill={this.generateColor()} />))}
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
