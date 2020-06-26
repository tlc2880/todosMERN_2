//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

const router = require('express').Router();
let Todo = require('../models/todo.model');

// Read all todos
router.route('/').get((req, res) => {
  Todo.find() // mongoose returns a promise
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const priority = req.body.priority;
  const date = Date.parse(req.body.date);

  const newTodo = new Todo({
    username,
    description,
    priority,
    date,
  });

  newTodo.save()
  .then(() => res.json('Todo added!')) // mongoose returns a promise
  .catch(err => res.status(400).json('Error: ' + err));
});

// Read
router.route('/:id').get((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete
router.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update
router.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.username = req.body.username;
      todo.description = req.body.description;
      todo.priority = req.body.priority;
      todo.date = Date.parse(req.body.date);

      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;