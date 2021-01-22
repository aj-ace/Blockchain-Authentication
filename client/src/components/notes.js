import React from 'react';
import { 
    Typography,
    IconButton,
    Card,
    CardActions,
    CardContent
   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.spacing(29),
        margin: "0 auto",
        breakInside: "avoid",
        pageBreakInside: "avoid",
        padding: "0.5rem 0",
        transition: theme.transitions.create("all", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.standard
        })
      },
      wrapper: {
        display: "flex",
        flexDirection: "column",
        borderWidth: theme.spacing(0.1),
        borderStyle: "solid"
      },
      todosWrapper: {
        margin: "0 auto",
        columnWidth: theme.spacing(29),
        columnGap: "0.5rem"
      },
}));


const Notes = ({ data, openUpdateDialog, openDeleteDialog  }) => {

  const classes = useStyles();
    return(
        <div className={classes.todosWrapper}>
            {data.map(item => (
            <div className={classes.root} key={item._id}>
                <Card className={classes.wrapper}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ wordWrap: "break-word" }}>
                    {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ wordWrap: "break-word" }}>
                    {item.content}
                    </Typography>
                </CardContent>
                <CardActions>
                <IconButton onClick={(event) => openUpdateDialog(event, item._id, item.title, item.content)} aria-label="edit" color="inherit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={(event) => openDeleteDialog(event, item._id)} aria-label="delete" color="inherit">
                    <DeleteIcon />
                </IconButton>
                </CardActions>
                </Card>
            </div>
            ))}
        </div>
    );
}

export default Notes;
