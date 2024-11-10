import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse, User } from "../context/auth-context";
import { useConversation } from "../context/conversation-context";

type UserList = User[];

const useDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userContact, setUserContact] = useState<UserList>([]);
  const {deleteUser } = useConversation();

    const getRemainingConversations = async (deleteUser:string) => {
      setLoading(true);
      try {
        console.log(deleteUser)
        const res = await fetch(`/api/users/delete/${deleteUser}`,{
            method:"DELETE"
        });
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


  return { loading, userContact,getRemainingConversations};
};
export default useDelete;
