//     Name: Tommy Cao
//     Date: 1/6/20
//     Description: Todo MERN Application

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
//mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// 6/25/20: This is Atlas and it11 runs fine.  Note that this Collection is different from the local Collection below.  
// When using Compass Community, need to connect correctly to Atlas.
mongoose.connect('mongodb+srv://abc123:Abc123@cluster0-0r2nz.mongodb.net/todosUserMERN?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }); 

// 6/27/20: This runs fine.  This Collection is different from the above.  It is a local Collection Cluster.
//mongoose.connect('mongodb://127.0.0.1:27017/todoUserMERN', { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});