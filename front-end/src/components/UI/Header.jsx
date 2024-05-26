function Header({back_button}) {
	return (
		<header className="flex px-[50px] py-4 border-b-[1px] border-[#c7c7c7] items-center justify-between">
			<div className="flex flex-col">
				<span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#4F68C4] to-[#1A3594]">
					AI Certs
				</span>
				<span>Todo Assignment</span>
			</div>
			{back_button}
		</header>
	);
}

export default Header;
