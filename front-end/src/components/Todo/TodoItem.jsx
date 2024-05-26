import {Link} from 'react-router-dom'
function TodoItem({ completed, title, description, id ,updateTodo, deleteTodo}) {

	const words= description.split(' ')
	if (words.length > 7){
		description = words.splice(0,7).join(' ')
		description += "..."
	}

	const textStyle =
		"text-xl text-transparent bg-clip-text bg-gradient-to-tr from-[#4F68C4] to-[#1A3594]";
	return (
		<div className="flex items-center gap-2 border-b-[1px] py-4 px-2 border-[#DBDBDB]">
			<button className="self-end" onClick={(e) => {
        updateTodo(id, {completed : !completed})
      }}>
				{completed ? (
					<i className={`fa-solid fa-square-check ${textStyle}`}></i>
				) : (
					<i className={`fa-regular fa-square ${textStyle}`}></i>
				)}
			</button>
			<span style={{textDecoration : completed ? "line-through" : "none"}} className="text-xl font-semibold text-[#1e1e1e]">{title}</span>
			<span className="text-sm text-[#989898]">({description})</span>
			<button className="ml-auto" onClick={(e) => {
        deleteTodo(id)
      }}>
				<i className={`fa-solid fa-trash ${textStyle}`}></i>
			</button>
			<Link to={`/form/${id}`} className="ml-2">
				<i className={`fa-solid fa-pencil ${textStyle}`}></i>
			</Link>
		</div>
	);
}

export default TodoItem;
