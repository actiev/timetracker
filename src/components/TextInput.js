import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

const styles = ({
  input: {
    width: 255,
    color: '#344dc4',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 26
  }
})

const TextInput = ({classes, action, value}) => (
  <Input
    name="task"
    className={classes.input}
    value={value}
    placeholder="Name of your task"
    onChange={action}
  />
)

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default withStyles(styles)(TextInput)
