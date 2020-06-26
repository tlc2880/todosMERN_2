//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;