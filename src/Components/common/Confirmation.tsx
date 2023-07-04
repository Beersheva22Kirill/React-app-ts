import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react';

type Props = {
    //TODO
}

const Confirmation:React.FC<Props> = ({}) => {
    
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
      };

    return <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Use Google's location service?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button onClick={handleClose} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
}