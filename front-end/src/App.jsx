import Home from "./pages/home";
import Form from "./pages/form";
import {Route, Routes} from "react-router-dom"
function App() {
	return (
		<>
			<Routes>
				<Route element={<Home />} path="/"/>
				<Route element={<Form />} path="/form/:id"/>
				<Route element={<Form />} path="/form"/>
			</Routes>
		</>
	);
}

export default App;
