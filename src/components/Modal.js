import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

const Modal = ({ open, action }) => (
  <div>
    <Dialog
      open={open}
      onClose={action}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Empty task name</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are trying close your task without name enter the title and try again!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  </div>
)

Modal.propTypes = {
  action: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default Modal
