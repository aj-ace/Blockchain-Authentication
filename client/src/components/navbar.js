import React from 'react';
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1,
      },
}));


const NavBar= ({ openAddDialog }) => {

  const classes = useStyles();
    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            NOTES
          </Typography>
          <div className={classes.grow} />
            <IconButton onClick={openAddDialog} aria-label="add" color="inherit">
                <AddIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;
