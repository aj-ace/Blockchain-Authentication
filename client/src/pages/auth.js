import React, { Component} from 'react';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS} from '../config';
import { CircularProgress, Button, Typography }from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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

class Auth extends Component {
  constructor(props){
      super(props);
      this.state = {
          open: true,
          account: '',
      }
  }

  componentDidMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        this.setState({
            account: accounts[0]
        })
        const Instance = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
        this.setState({
            Instance
        })
        const token = await Instance.methods.token(this.state.account).call();
        if(token == 0){
            this.setState({
                open: false
            })
        }else {
           this.props.history.push("/home", { token });
        } 
      } catch (error) {
          console.log(error)
      } 
  }

  handleClick = (event) => {
    event.preventDefault();
    this.state.Instance.methods.setToken().send({ from: this.state.account })
    .once('receipt', () => {
      this.state.Instance.methods.token(this.state.account).call().then((token) => {
        this.props.history.push("/home", { token });
      });
    }).catch(() => alert("transaction rejected"));
  }

  render(){
    const {classes} = this.props;
      return (
    <div className={classes.main}>
        <Typography className={classes.root} variant="h2" component="h2">
        Authentication
      </Typography>
      <div className={classes.root}>
       {this.state.open ? 
         <CircularProgress size={200}/>: 
       
         <Button onClick={this.handleClick} variant="contained" color="primary">
            First time sign up authentication
        </Button>
         } 
        </div>
    </div>
  );
  }  
}

export default withStyles(styles)(Auth);