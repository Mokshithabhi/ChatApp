import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./auth-context";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[]; 
}

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children }: SocketContextProviderProps): JSX.Element => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // Assuming onlineUsers is an array of user IDs (strings)
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketConnection = io("http://localhost:4000/", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socketConnection);

      socketConnection.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socketConnection.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
