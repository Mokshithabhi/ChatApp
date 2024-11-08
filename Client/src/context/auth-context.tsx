import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Gender = "male" | "female";

export interface User {
  _id: string;
  fullName: string;
  username: string;
  gender?: Gender;
  password?:string;
  confirmPassword?:string;
  profilePic: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ErrorResponse {
    error: string; 
    message: string;  
  }

interface AuthContextType {
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const storedUser = localStorage.getItem("chat-user");
  const [authUser, setAuthUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
