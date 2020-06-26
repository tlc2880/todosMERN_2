//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CreateDialog extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      modal: true,
      username: '',
      description: '',
      priority: 'High',
      date: new Date(),
      users: []
    }
  }

  static defaultProps = {
    priorities: ['High', 'Medium', 'low']
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      modal: this.state.false,
      username: this.state.username,
      description: this.state.description,
      priority: this.state.priority,
      date: this.state.date
    }

    console.log(todo);

    axios.post('http://localhost:5000/todos/add', todo)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    let priorityOptions = this.props.priorities.map(priority => {
      return <option key={priority} value={priority}>{priority}</option>
    });    
    return (
    <div>
    <Modal isOpen={this.state.modal}>
      <form onSubmit={this.onSubmit.bind(this)}>
      <ModalHeader>Create Todo Dialog</ModalHeader>
      <ModalBody>
          
        <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                  return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
            required
            className="form-control"
            value={this.state.description}
            onChange={this.onChangeDescription}
            />
        </div>

        <div className="form-group">
              <label>Priority:</label>
              <select className="form-control" ref="priority" onChange={this.onChangePriority}>{priorityOptions}</select>              
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
      
      </ModalBody>
      <ModalFooter>
        <input type="submit" onClick={this.toggle} value="Submit" color="primary" className="btn btn-primary" />
        <Button color="danger" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
      </form> 
    </Modal>
  </div>    
    )
  }
}