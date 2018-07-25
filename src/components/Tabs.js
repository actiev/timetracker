import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import TasksLog from '../containers/TasksLog'
import TasksChart from '../containers/TasksChart'

const CustomTabs = ({value, action}) => {
  value = value === true ? 1 : 0
  return (
    <div className="tabs">
      <AppBar position="static" className="header">
        <Tabs value={value} onChange={action}>
          <Tab label="TASKS LOG" className="tab" />
          <Tab label="TASKS CHART" className="tab" />
        </Tabs>
      </AppBar>
      {value === 0 &&
      <Typography component="div">
        <TasksLog/>
      </Typography>
      }
      {value === 1 &&
      <Typography component="div">
        <TasksChart/>
      </Typography>
      }
    </div>
  )
}

export default CustomTabs
