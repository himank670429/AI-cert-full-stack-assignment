import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();

function DataProvider({ children }) {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:3000/tasks");
			const data = response.data;
			setTodos(data);
			setLoading(false);
		}
		fetchData();
	}, []);
	return (
		<DataContext.Provider value={{ todos, setTodos}}>
			{loading ? <p>Loading</p> : children}
		</DataContext.Provider>
	);
}

export function useTodos() {
	const { todos, setTodos} = useContext(DataContext);

	async function addTodo(title, description, dueDate) {
		const response = await axios.post("http://localhost:3000/tasks", {
			title,
			description,
			dueDate,
		});
		const newTodo = response.data
		setTodos((prev) => ([ ...prev, newTodo ]));
	}

	async function updateTodo(todoID, updatedFeilds) {
		const response = await axios.put(
			`http://localhost:3000/tasks/${todoID}`,
			updatedFeilds
		);
		const newTodo = response.data;
		setTodos((prev) => {
			const updatedTodos = [ ...prev];
			for (let i = 0; i < updatedTodos.length; i++) {
				if (updatedTodos[i].id === newTodo.id) {
					updatedTodos[i] = newTodo;
				}
			}
			return updatedTodos;
		});
	}

	async function deleteTodo(todoID) {
		const response = await axios.delete(`http://localhost:3000/tasks/${todoID}`);
		const data = response.data;
		setTodos((prev) => prev.filter(item => item.id !== todoID));
	}

	return {
		todos,
		addTodo,
		updateTodo,
		deleteTodo,
	};
}

export default DataProvider;
