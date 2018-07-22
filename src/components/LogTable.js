import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Time from '../components/Time'

const CustomTableCell = withStyles(({
  head: {
    backgroundColor: '#fff',
    color: '#a19e9e',
    height: 65,
    fontSize: 14
  },
  body: {
    fontSize: 14,
    color: '#344dc4'
  }
}))(TableCell)

const styles = ({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  button: {
    color: '#344dc4',
    background: '#fff',
    minWidth: 65,
    height: 40,
    '&:hover': {
      backgroundColor: '#eaf6ff'
    }
  },
  table: {
    backgroundColor: '#fff'
  },
  row: {
    backgroundColor: '#eaf6ff',
    height: 75
  }
})

const LogTable = ({classes, tasks, deleteTask, getInfo}) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <CustomTableCell>№</CustomTableCell>
          <CustomTableCell>Task</CustomTableCell>
          <CustomTableCell>Time start</CustomTableCell>
          <CustomTableCell>Time end</CustomTableCell>
          <CustomTableCell>Time speed</CustomTableCell>
          <CustomTableCell>Info</CustomTableCell>
          <CustomTableCell>Delete</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, index) => {
          return (
            <TableRow className={classes.row} key={task.id}>
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
                  hours: task.speed.hours,
                  minutes: task.speed.minutes,
                  seconds: task.speed.seconds
                }}/>
              </CustomTableCell>
              <CustomTableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => getInfo(task.id)}
                >
                  Info
                </Button>
              </CustomTableCell>
              <CustomTableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </CustomTableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </Paper>
)

LogTable.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
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
  )
}

export default withStyles(styles)(LogTable)
