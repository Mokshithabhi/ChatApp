import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse, User } from "../context/auth-context";

type UserList = User[];

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<UserList>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data: UserList = await res.json();
        if (!res.ok) {
          const data: ErrorResponse = await res.json(); 
          throw new Error(data.message);
        }
        setConversations(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
