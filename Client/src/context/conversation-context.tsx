import  { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ConversationContextType {
  selectedConversation: any;
  setSelectedConversation: (selectedConversation: any) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedConversation) {
      setCurrentConversationId(selectedConversation._id); 
    }
  }, [selectedConversation]);

  const value = {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
    currentConversationId,
    setCurrentConversationId,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
