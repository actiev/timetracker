import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import LogTable from '../components/LogTable'
import classNames from 'classnames'
import * as TabsActions from '../actions/tabs-actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class TaskTabs extends React.Component {
  removeTask = id => {
    this.props.removeTask(id)
  }

  getInfo = id => {
    console.log(id)
  }

  render () {
    const value = this.props.state.handle === true ? 0 : 1
    const tabs = classNames({tabs: true})
    const header = classNames({header: true})
    const tab = classNames({tab: true})

    console.log(this.props.state.tasks, this.props.state.timer)

    return (
      <div className={tabs}>
        <AppBar position="static" className={header}>
          <Tabs value={value} onChange={() => { this.props.toggleTabs() }}>
            <Tab label="TASKS LOG" className={tab} />
            <Tab label="TASKS CHART" className={tab} />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <Typography component="div">
            <LogTable
              deleteTask={this.removeTask}
              tasks={this.props.state.tasks}
              getInfo={this.getInfo}
            />
          </Typography>
        }
        {value === 1 &&
          <Typography component="div">
            Item Two
          </Typography>
        }
      </div>
    )
  }
}

const mapStateToProps = state => { return {state: state.app} }

const matchDispatchToProps = dispatch => {
  return bindActionCreators(TabsActions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskTabs)
