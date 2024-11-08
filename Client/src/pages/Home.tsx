import MessageContainer from "../components/messages/messages-container";
import Sidebar from "../components/sidebar/sidebar";
import { ConversationProvider } from "../context/conversation-context";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <ConversationProvider>
        <Sidebar />
        <MessageContainer />
      </ConversationProvider>
    </div>
  );
};

export default Home;
