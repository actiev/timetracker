import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import LogTable from './LogTable'

const styles = ({
  tabs: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: 'inherit'
  },
  header: {
    backgroundColor: '#1fbcd3',
    boxShadow: 'none'
  },
  tab: {
    width: '50%',
    maxWidth: '50%'
  }
})

class SimpleTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.tabs}>
        <AppBar position="static" className={classes.header}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="TASKS LOG" className={classes.tab} />
            <Tab label="TASKS CHART" className={classes.tab} />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <Typography component="div">
            <LogTable data={this.props.data} />
          </Typography>
        }
        {value === 1 &&
          <Typography component="div">
            Item Two
          </Typography>
        }
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTabs)
