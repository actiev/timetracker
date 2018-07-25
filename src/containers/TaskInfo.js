import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import CustomTableCell from '../components/Table/CutsomTableCell'
import TableHead from '@material-ui/core/TableHead'
import CustomTableRow from '../components/Table/CustomTableRow'
import Paper from '@material-ui/core/Paper'
import Button from '../components/Button'
import Time from '../components/Time'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const TaskInfo = ({task}) => {
  if (!task) {
    return (
      <Redirect to={{pathname: '/404'}}/>
    )
  }

  return (
    <div className="container">
      <Paper>
        <Table>
          <TableHead>
            <CustomTableRow>
              <CustomTableCell>Task</CustomTableCell>
              <CustomTableCell>Time start</CustomTableCell>
              <CustomTableCell>Time end</CustomTableCell>
              <CustomTableCell>Time speed</CustomTableCell>
            </CustomTableRow>
          </TableHead>
          <TableBody>
            <CustomTableRow>
              <CustomTableCell component="th" scope="row">{task.title}</CustomTableCell>
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
                  hours: task.speed.hours,
                  minutes: task.speed.minutes,
                  seconds: task.speed.seconds
                }}/>
              </CustomTableCell>
            </CustomTableRow>
          </TableBody>
        </Table>
      </Paper>
      <div className="row">
        <Link to="/">
          <Button text="Home"/>
        </Link>
      </div>
    </div>
  )
}

TaskInfo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    start: PropTypes.shape({
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number
    }),
    end: PropTypes.shape({
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number
    }),
    speed: PropTypes.shape({
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number
    })
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.initialState.tasks.find(task => task.id === Number(ownProps.match.params.id))
  }
}

export default connect(mapStateToProps)(TaskInfo)
