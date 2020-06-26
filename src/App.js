//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import TodosList from "./components/todos-list.component";
import EditDialog from "./components/edit-dialog.component";
import CreateTodo from "./components/create-todo.component";
import CreateDialog from "./components/create-dialog.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={TodosList} />
      <Route path="/edit-dialog/:id" component={EditDialog} />
      <Route path="/create" component={CreateTodo} />
      <Route path="/create-dialog" component={CreateDialog} />      
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;