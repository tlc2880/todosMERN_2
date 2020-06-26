//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Todo MERN</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">        
          <li className="navbar-item">
            <Link to="/" className="nav-link">Todos List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
          </li>            
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Todo Page</Link>
          </li>          
        </ul>
        </div>
      </nav>
    );
  }
}