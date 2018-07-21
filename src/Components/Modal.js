import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class Modal extends React.Component {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentWillReceiveProps (props) {
    this.setState({ open: props.open })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
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
    );
  }
}

export default Modal
