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
  },
})

function LogTable (props) {
  const { classes } = props
  const tasks = props.data

  return (
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
          {tasks.map(task => {
            return (
              <TableRow className={classes.row} key={task.id}>
                <CustomTableCell component="th" scope="row">
                  {task.id}
                </CustomTableCell>
                <CustomTableCell>{task.title}</CustomTableCell>
                <CustomTableCell>
                  {(task.start.hours < 10 ? '0' + task.start.hours : task.start.hours) +
                  ':' + (task.start.minutes < 10 ? '0' + task.start.minutes : task.start.minutes) +
                  ':' + (task.start.seconds < 10 ? '0' + task.start.seconds : task.start.seconds)}
                </CustomTableCell>
                <CustomTableCell>
                  {(task.end.hours < 10 ? '0' + task.end.hours : task.end.hours) +
                  ':' + (task.end.minutes < 10 ? '0' + task.end.minutes : task.end.minutes) +
                  ':' + (task.end.seconds < 10 ? '0' + task.end.seconds : task.end.seconds)}
                </CustomTableCell>
                <CustomTableCell>
                  {(task.speed.hours < 10 ? '0' + task.speed.hours : task.speed.hours) +
                  ':' + (task.speed.minutes < 10 ? '0' + task.speed.minutes : task.speed.minutes) +
                  ':' + (task.speed.seconds < 10 ? '0' + task.speed.seconds : task.speed.seconds)}
                </CustomTableCell>
                <CustomTableCell>
                  <Button variant="contained" className={classes.button}>Info</Button>
                </CustomTableCell>
                <CustomTableCell>
                  <Button variant="contained" className={classes.button}>Delete</Button>
                </CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

LogTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogTable)