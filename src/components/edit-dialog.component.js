//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class EditDialog extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      modal: true,
      username: '',
      description: '',
      priority: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/todos/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          priority: response.data.priority,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  static defaultProps = {
    priorities: ['High', 'Medium', 'low']
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

  handleSave() {
    const item = this.state;
    this.props.saveModalDetails(item)
}

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      username: this.state.username,
      description: this.state.description,
      priority: this.state.priority,
      date: this.state.date
    }

    console.log(todo);

    axios.post('http://localhost:5000/todos/update/' + this.props.match.params.id, todo)
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
      <form onSubmit={this.onSubmit}>
      <ModalHeader>Edit Todo Dialog</ModalHeader>
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
          <label>Priority: </label>
            <select  value={this.state.priority} onChange={(e) => this.onChangePriority(e)}>{priorityOptions}></select>               
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