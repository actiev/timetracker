import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import PropTypes from 'prop-types'

const Modal = ({ open, action }) => (
  <div className="modal">
    <Dialog
      open={open}
      onClose={action}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">Empty task name</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are trying close your task without name enter the title and try again!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

Modal.propTypes = {
  action: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default Modal
