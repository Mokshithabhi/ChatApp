import LogoutButton from "../logout-button";
import SearchInput from "../search-input";
import ConversationContainer from "./conversation-container";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<ConversationContainer />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;