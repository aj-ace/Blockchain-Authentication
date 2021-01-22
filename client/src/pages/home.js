import React, { Component } from 'react';
import axios from 'axios';
import Delete from '../components/delete';
import AddUpdate from '../components/addupdate';
import NavBar from '../components/navbar';
import Notes from '../components/notes';

const URL = process.env.REACT_APP_API;

class Home extends Component {

  constructor(props){
    super(props);
    this.state ={ 
      token: '',
      data: [],
      title: '',
      content: '',
      openDelete: false,
      open: false,
      id: '',
      toggle: false

    }
  }

  async componentDidMount(){
    
        if(this.props.location.state == null){
          this.props.history.push("/");
        }else {
          try {
            const { token } = this.props.location.state;
            this.setState({ token })
            const res = await axios.put(URL, JSON.stringify({token}), {
              headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              }
            });
            const data = res.data;
            this.setState({ data })
        
          } catch (error) {
            console.log(error)
          } 
        } 
      
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  openDeleteDialog = (event, id) => {
    event.preventDefault();
    this.setState({
      id,
      openDelete: true
    })
    
  }

  handleDelete = async(event) => {
    event.preventDefault();
    const res = await axios.delete(URL, {data:{
      _id: this.state.id,
      token: this.state.token
    }},{
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
    const result = res.data;
    let data =[...this.state.data];
    data = data.filter(datas => datas._id !== result._id);
    this.setState({
      data,
      openDelete: false,
      id: ''
    })
  }

  openUpdateDialog = (event, id, title, content) => {
    event.preventDefault();
    this.setState({
      toggle: true,
      open: true,
      id,
      title,
      content
    })
  }

  openAddDialog = (event) => {
    event.preventDefault();
    this.setState({
      toggle: false,
      open: true
    })
  }

  handleUpdate = async(event) => {
    event.preventDefault();
    const res = await axios.patch(URL, 
      JSON.stringify({
        _id: this.state.id,
        token: this.state.token,
        title: this.state.title,
        content: this.state.content
      }), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
    });
    const notes = res.data;
    let data =[...this.state.data]; 
    let note = data.find(data => data._id === notes._id);
    Object.assign(note, notes);
    this.setState({
      data,
      open: false,
      id: '',
      title: '',
      content: ''
    })
  }

  handleAdd = async(event) => {
    event.preventDefault();
    const res = await axios.post(URL, 
    JSON.stringify({
      token: this.state.token,
      title: this.state.title,
      content: this.state.content
    }), {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
    const notes = res.data;
    let data = [...this.state.data];
    data.push(notes);
    this.setState({ 
      data,
      open: false,
      title: '',
      content: ''
     })
  }

  handleCloseDelete = () => {
    this.setState({
      openDelete: false,
      id: ''
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      id: '',
      title: '',
      content: ''
    })
  }
  render(){

  return (
    <div>
      <Delete 
        openDelete={this.state.openDelete}
        handleCloseDelete={this.handleCloseDelete}
        handleDelete={this.handleDelete}
      />

      <AddUpdate 
        open={this.state.open}
        toggle={this.state.toggle}
        title={this.state.title}
        content={this.state.content}
        handleClose={this.handleClose}
        handleChange={this.handleChange}
        handleUpdate={this.handleUpdate}
        handleAdd={this.handleAdd}
      />

      <NavBar 
        openAddDialog={this.openAddDialog}
      />

      <Notes 
        data={this.state.data}
        openUpdateDialog={this.openUpdateDialog}
        openDeleteDialog={this.openDeleteDialog}
      />
    </div>
    
  );
  }
  
}

export default Home;