import React from "react";
import { useTodos } from "../../context/DataContext";
import TodoItem from "../Todo/TodoItem";
import { Link } from "react-router-dom";
function TodoContainer() {
	const { todos, updateTodo, deleteTodo } = useTodos();
	return (
		<div className="px-[50px] grow flex flex-col gap-4 py-6">
			{todos.length ? (
				<>
					<span className="font-bold">
						Progess : {todos.filter((item) => item.completed).length}/{todos.length}
					</span>
					{todos.map((item) => (
						<TodoItem
							{...item}
							key={item.id}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
						/>
					))}
				</>
			) : (
				<div className="size-full flex flex-col justify-center items-center text-[#9C9C9C]">
					<span className="text-4xl font-bold">nothing to display</span>
					<span>
						click &nbsp;
						<Link
							to="/form"
							className="underline text-transparent bg-clip-text bg-gradient-to-tr from-[#4F68C4] to-[#1A3594] font-semibold"
						>
							create
						</Link>
						&nbsp; to create you first todo
					</span>
				</div>
			)}
		</div>
	);
}

export default TodoContainer;
