// import function to safegourd the data base by saving it the json file
const {readJSON, writeJSON} = require("../utils/jsonHandler")
// load the data into memory
let todos = readJSON();
const validateTodos = require("../utils/schemaValidator");

module.exports = {
    // function to retreive all the todos
	getTodos: async function (req, res) {
        return res.status(200).send(todos);
	},

    // function to retrienve a single todo
	getTodo: async function (req, res) {
        const todo = todos.filter(item => item.id === req.params.id)[0];
        if (todo) {
            return res.status(200).send(todo);
        } else {
            return res.status(400).send("Invalid todo ID.");
        }
	},

    // function to add a todo
	addTodo: async function (req, res) {
        console.log(req.body)
		try {
            const todo = validateTodos({
                ...req.body, 
                completed:false, 
                id:crypto.randomUUID()
            });
            
            // save the todo
            todos.push(todo)
            // save it in the json as well
            writeJSON(todos)

            console.log(todos)

			return res.status(200).send(todo);
		} catch (error) {
			if (error?.name === "KeyError" || error?.name === "ValueError") {
				res.status(400).send(error.message);
			} else {
				res.status(500).send(error?.message);
			}
		}
	},

    // function to update a todo
	updateTodo: async function (req, res) {
		try {
            for (let i = 0; i < todos.length; i++){
                let currentTodo = todos[i];
                if (currentTodo.id === req.params.id) {
                    currentTodo = validateTodos({...currentTodo, ...req.body});
                    todos[i] = currentTodo;
                    // save cahnges into json file
                    writeJSON(todos)

                    return res.status(200).send(currentTodo);
                }
            }
            return res.status(400).send("Invalid todo ID.");
		} catch (error) {
            return res.status(500).send(error?.message)
        }
	},

    // function to delete a todo
	deleteTodo: async function (req, res) {
		try {
            todos = todos.filter(item => item.id !== req.params.id)
            // save it in the json as well
            writeJSON(todos)
			res.status(200).send({
                acknowledged : true,
                deletedId : req.params.id
            });
		} catch (error) {
			return res.status(500).send(error?.message);
		}
	},
};

/*
{
  "title" : "complete assingment",
  "description" : "complete the intership given to me by AI certs.",
  "dueDate" : 1716647227926
}
*/
