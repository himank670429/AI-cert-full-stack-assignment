import Header from "../components/UI/Header";
import TodoContainer from "../components/UI/TodoContainer";
import {Link} from 'react-router-dom'
function Home() {
	return (
		<>
			<Header
				back_button={
					<Link
						to="/form"
						className="bg-gradient-to-tr from-[#4F68C4] to-[#1A3594] text-white px-4 py-1 rounded-md"
					>
						create
					</Link>
				}
			/>
			<TodoContainer />
		</>
	);
}

export default Home;
