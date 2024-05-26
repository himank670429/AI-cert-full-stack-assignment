import { useTodos } from "../context/DataContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/UI/Header";
function Form() {
	const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
	const { id } = useParams();
	const [isInvalidTodoID, setIsInvalidTodoID] = useState(false);
	const [formData, setFormData] = useState(function () {
		if (id) {
			const todo = todos.filter((item) => item.id === id)[0];
			if (!todo) {
				setIsInvalidTodoID(true);
				return {
					title: "",
					description: "",
					dueDate: "",
				};
			}
			return todo;
		}

		return {
			title: "",
			description: "",
			dueDate: "",
		};
	});

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		// update todo
		if (id) {
			await updateTodo(id, formData);
			alert("Todo Updated");
		}
		// create todo
		else {
			await addTodo(formData.title, formData.description, formData.dueDate);
			alert("todo added");
		}
	}
	// console.log(formData)
	// console.log((new Date(formData.dueDate)).toISOString().slice(0, 16).split('T')[0] || null)

	return (
		<>
			<Header
				back_button={
					<Link
						to="/"
						className="bg-gradient-to-tr from-[#4F68C4] to-[#1A3594] text-white px-4 py-1 rounded-md"
					>
						go back
					</Link>
				}
			/>
			<div className="px-[50px] grow py-8 flex flex-col border">
				{isInvalidTodoID ? (
					<p className="text-4xl font-bold text-[#9C9C9C] self-center my-auto">
						invalid todo ID passed :(
					</p>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-8 grow">
						<div className="flex flex-col">
							<label className="text-xl text-[#1e1e1e] font-semibold">Title</label>
							<input
								type="text"
								placeholder="Ex. Do Laundary"
								required
								value={formData.title}
								className="outline-none bg-[#f0f0f0] p-4 rounded-lg w-[50%]"
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, title: e.target.value }))
								}
							/>
						</div>
						<div className="flex flex-col grow">
							<label className="text-xl text-[#1e1e1e] font-semibold">
								Description
							</label>
							<textarea
								placeholder="Ex. Wash all my clothes till 3pm"
								required
								value={formData.description}
								className="outline-none bg-[#f0f0f0] p-4 rounded-lg grow resize-none"
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, description: e.target.value }))
								}
							/>
						</div>
						<div className="flex flex-col">
							<label className="text-xl text-[#1e1e1e] font-semibold">Due Date</label>
							<input
								type="date"
								required
								placeholder="Ex. Wash all my clothes till 3pm "
								className="outline-none bg-[#f0f0f0] p-4 rounded-lg w-fit"
								min={(new Date()).toISOString().slice(0, 16).split("T")[0]}
								value={
									formData.dueDate
										? new Date(formData.dueDate).toISOString().slice(0, 16).split("T")[0]
										: ""
								}
								onChange={(e) => {
									const value = Date.parse(e.target.value);
									setFormData((prev) => ({ ...prev, dueDate: value }));
								}}
							/>
						</div>

						<div className="flex gap-4">
							<button className="bg-gradient-to-tr from-[#4F68C4] to-[#1A3594] text-white px-4 py-1 rounded-md flex gap-2 items-center">
								<i className="fa-solid fa-floppy-disk"></i>save
							</button>
							<button
								disabled={!Boolean(id)}
								onClick={async (e) => {
									await deleteTodo(id);
									alert("todo deleted");
									navigate("/");
								}}
								className=" px-4 py-1 rounded-md flex gap-2 items-center bg-[#f0f0f0] text-[#4d4d4d]"
							>
								<i className="fa-solid fa-trash"></i>delete
							</button>
						</div>
					</form>
				)}
			</div>
		</>
	);
}

export default Form;
