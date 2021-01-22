import React from 'react';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
   } from '@material-ui/core';

const Delete = ({ openDelete, handleCloseDelete, handleDelete }) => {

    return(
        <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Note</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this note?
            </DialogContentText>   
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleCloseDelete} >
              no
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete} >
              yes
            </Button>
          </DialogActions>
      </Dialog>
    );
}

export default Delete;
