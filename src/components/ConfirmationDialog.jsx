import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const DialogConfirmation = (props) => {
  const { open, handleClose, handleConfirm } = props
  
return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose()
        }
      }}
    >
      <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus, eligendi hic ipsam itaque optio porro quasi similique unde veniam. Aspernatur atque minima quasi? Adipisci enim nihil ratione repellendus voluptatibus.
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleConfirm}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation
