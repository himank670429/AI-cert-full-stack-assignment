import { Link } from "react-router-dom";
function TodoItem({
	completed,
	title,
	description,
	dueDate,
	id,
	updateTodo,
	deleteTodo,
}) {
	const words = description.split(" ");
	if (words.length > 7) {
		description = words.splice(0, 7).join(" ");
		description += "...";
	}

	const pasrsedDate = new Date(dueDate).toISOString().slice(0, 16).split("T")[0];
	const diff = Date.now() - dueDate;
	const numberofday = (new Date(diff)).getDay()

	const textStyle =
		"text-xl text-transparent bg-clip-text bg-gradient-to-tr from-[#4F68C4] to-[#1A3594]";
	return (
		<div className="flex items-center gap-2 border-b-[1px] py-4 px-2 border-[#DBDBDB]">
			<button
				className="self-start mt-2"
				onClick={(e) => {
					updateTodo(id, { completed: !completed });
				}}
			>
				{completed ? (
					<i className={`fa-solid fa-square-check ${textStyle}`}></i>
				) : (
					<i className={`fa-regular fa-square ${textStyle}`}></i>
				)}
			</button>
			<div className="flex flex-col gap-2">
				<span
					style={{ textDecoration: completed ? "line-through" : "none" }}
					className="text-xl font-semibold text-[#1e1e1e]"
				>
					{title} {completed ? null : <span className="text-[#5c5b5b] text-base">({numberofday} {numberofday !== 1 ? "days" : "day"} left)</span>}
				</span>
				<span className="text-sm flex gap-2 items-center text-[#989898]">
					<i class="fa-regular fa-calendar"></i>
					<b>Due Date :</b> {pasrsedDate}
				</span>
				<span className="text-sm flex gap-2 items-center text-[#989898]">
					<i class="fa-solid fa-pencil"></i>
					<b>Descption :</b> {description}
				</span>
			</div>
			<button
				className="ml-auto"
				onClick={(e) => {
					deleteTodo(id);
				}}
			>
				<i className={`fa-solid fa-trash ${textStyle}`}></i>
			</button>
			<Link to={`/form/${id}`} className="ml-2">
				<i className={`fa-solid fa-pencil ${textStyle}`}></i>
			</Link>
		</div>
	);
}

export default TodoItem;
