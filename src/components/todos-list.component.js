//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { button } from 'reactstrap';

const Todo = props => (
  <tr>
    <td>{props.todo.username}</td>
    <td>{props.todo.description}</td>
    <td>{props.todo.priority}</td>
    <td>{props.todo.date.substring(0,10)}</td>
    <td>
        <Link to={"/edit-dialog/"+props.todo._id}><button className="btn btn-primary">Edit</button></Link>  
          <button className="btn btn-danger" onClick={() => { props.deleteTodo(props.todo._id) }}>Delete</button>
    </td>
  </tr>
)

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this)

    this.state = {todos: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTodo(id) {
    axios.delete('http://localhost:5000/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} deleteTodo={this.deleteTodo} key={currenttodo._id}/>;
    })
  }

  render() {
    this.state.todos.sort(function(a, b){
      var x = a.priority;
      var y = b.priority;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    return (
      <div>
        <h3>Todos List</h3>
        <Link to={"/create-dialog/"}><button className="btn btn-success">Create Todo Dialog</button></Link>  
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    )
  }
}