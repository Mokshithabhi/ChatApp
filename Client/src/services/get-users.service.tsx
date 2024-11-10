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
        let res;
        if (!enableDelete) {
          res = await fetch("/api/users");
        } else if (enableDelete && id) {
          res = await fetch(`/api/users/delete/${id}`,{
            method:"DELETE"
          });
        } else {
          throw new Error("ID is required for deletion.");
        }
       const data: UserList = await res.json();
       console.log("res",data)
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
  }, [enableDelete,id]);

  return { loading, userContact };
};
export default useGetConversations;
