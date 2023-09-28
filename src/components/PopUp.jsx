import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const PopUp = (isOpen, handleRowClick) => {
  return (
    <Dialog open={isOpen} onClose={()=>handleRowClick}>
      <DialogContent>
        <DialogContentText>
          This is the content of the pop-up.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleRowClick}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PopUp;