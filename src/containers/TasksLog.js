import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import CustomTableCell from '../components/Table/CutsomTableCell'
import TableHead from '@material-ui/core/TableHead'
import CustomTableRow from '../components/Table/CustomTableRow'
import Paper from '@material-ui/core/Paper'
import Button from '../components/Button'
import Time from '../components/Time'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as TabsActions from '../actions'
import {connect} from 'react-redux'

class TasksLog extends Component {
  render () {
    const { state, removeTask } = this.props

    return (
      <Paper>
        <Table className="table">
          <TableHead>
            <CustomTableRow>
              <CustomTableCell>№</CustomTableCell>
              <CustomTableCell>Task</CustomTableCell>
              <CustomTableCell>Time start</CustomTableCell>
              <CustomTableCell>Time end</CustomTableCell>
              <CustomTableCell>Time speed</CustomTableCell>
              <CustomTableCell>Info</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {state.tasks.map((task, index) => {
              return (
                <CustomTableRow key={task.id}>
                  <CustomTableCell component="th" scope="row">
                    {index + 1}
                  </CustomTableCell>
                  <CustomTableCell>{task.title}</CustomTableCell>
                  <CustomTableCell>
                    <Time time={{
                      hours: task.start.hours,
                      minutes: task.start.minutes,
                      seconds: task.start.seconds
                    }}/>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Time time={{
                      hours: task.end.hours,
                      minutes: task.end.minutes,
                      seconds: task.end.seconds
                    }}/>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Time time={{
                      hours: task.spend.hours,
                      minutes: task.spend.minutes,
                      seconds: task.spend.seconds
                    }}/>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Link to={`/tasks/${task.id}`}>
                      <Button text="info" />
                    </Link>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Button
                      text="Delete"
                      action={() => { removeTask(task.id) }}
                    />
                  </CustomTableCell>
                </CustomTableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

const timerPropTypes = PropTypes.shape({
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number
})

TasksLog.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      start: timerPropTypes,
      end: timerPropTypes,
      speed: timerPropTypes
    })
  )
}

const mapStateToProps = state => ({state: state.initialState})

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TabsActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TasksLog)
