import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography }from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    padding: theme.spacing(20, 1),
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
});

class Login extends Component {

  nextPage = (event) => {
    event.preventDefault();
    this.props.history.push("/auth")
  }

  render(){
    const {classes} = this.props;
      return (
    <div className={classes.main}>
        <Typography className={classes.root} variant="h2" component="h2">
        Notes Manager
      </Typography>
      <div className={classes.root}>
        <Button variant="outlined" color="secondary" onClick={this.nextPage}>Login using your ethereum account</Button>
      </div>
    </div>
  );
  }  
}

export default withStyles(styles)(Login);