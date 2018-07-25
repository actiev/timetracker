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
    '&:hover': {
      backgroundColor: '#eaf6ff'
    }
  }
})

const button = ({ action, classes, className, text }) => (
  <Button
    variant="contained"
    onClick={action}
    className={classes.button + ' ' + className}
  >
    {text}
  </Button>
)

button.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  action: PropTypes.func,
  className: PropTypes.string
}

export default withStyles(styles)(button)
