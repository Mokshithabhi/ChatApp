import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse, User } from "../context/auth-context";

type UserList = User[];
interface ConversationParam {
  id?:string,
  enableDelete:boolean
}

const useGetConversations = ({id,enableDelete}:ConversationParam) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userContact, setUserContact] = useState<UserList>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        var res
        if(!enableDelete){
          res = await fetch("/api/users")        
        }
       else{res = await fetch(`/api/users/delete/${id}`); }
        const data: UserList = await res.json();
        if (!res.ok) {
          const data: ErrorResponse = await res.json(); 
          throw new Error(data.message);
        }
        setUserContact(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, userContact };
};
export default useGetConversations;
