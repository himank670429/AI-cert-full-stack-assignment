const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs')
require("dotenv").config();
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cors({
	origin : ["http://localhost:5173"]
}))

const {
	getTodos,
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
} = require("./controller/TodoController");



// define the API rountes
app.get("/tasks", getTodos);

app.get("/tasks/:id", getTodo);

app.post("/tasks", addTodo);

app.put("/tasks/:id", updateTodo);

app.delete("/tasks/:id", deleteTodo);


app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
