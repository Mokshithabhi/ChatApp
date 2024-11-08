import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/socket";
import { useConversation } from "../context/conversation-context";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.conversationId === selectedConversation?._id) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, setMessages, selectedConversation, messages]);
};
export default useListenMessages;
