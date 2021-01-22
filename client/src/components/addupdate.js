import React from 'react';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField
   } from '@material-ui/core';

const AddUpdate = ({ open, handleClose, toggle, title, content, handleChange, handleUpdate, handleAdd }) => {

    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{toggle ? "Update" : "Create"} Note</DialogTitle>
        <DialogContent>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            label="Title"
            type="text"
            id="title"
            autoComplete="title"
            onChange={handleChange}
            value={title}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            name="content"
            label="Content"
            type="text"
            id="content"
            autoComplete="content"
            onChange={handleChange}
            value={content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={toggle ? handleUpdate : handleAdd} color="primary" disabled={!title || !content}>
          {toggle ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default AddUpdate;
