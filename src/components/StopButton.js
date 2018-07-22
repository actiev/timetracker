import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = ({
  button: {
    color: '#344dc4',
    background: '#fff',
    minWidth: 65,
    height: 40,
    marginBottom: 18,
    '&:hover': {
      backgroundColor: '#eaf6ff'
    }
  }
})

const stopButton = ({ action, classes, className }) => (
  <Button
    variant="contained"
    onClick={action}
    className={classes.button + ' ' + className}
  >
    Stop
  </Button>
)

stopButton.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

export default withStyles(styles)(stopButton)
