import { User } from "../../context/auth-context";
import { useConversation } from "../../context/conversation-context";
import { useSocketContext } from "../../context/socket";
import { IoTrashBinSharp } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import { DeleteProp } from "./conversation-container";

interface ConversationProps {
  userContact: User;
  lastIdx: boolean;
  setDelete:Dispatch<SetStateAction<DeleteProp>>;
}

const ConversationRow = ({ userContact, lastIdx,setDelete }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation,setDeleteUser } = useConversation();
  const isSelected = selectedConversation?._id === userContact?._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(userContact._id);
  const handleDelete=(id:string,enableDelete:boolean)=>{
    setDelete({id,enableDelete})
  }

  return (
    <>
      <div className="flex items-center ">
        <div
          className={`flex gap-2 flex-1 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
          onClick={() => setSelectedConversation(userContact)}
        >
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 rounded-full">
              <img src={userContact.profilePic} alt="user avatar" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200">{userContact?.fullName}</p>
            </div>
          </div>
        </div>
        <div onClick={()=>handleDelete(userContact?._id,true)}>
        <IoTrashBinSharp
          className="z-0 hover:z-10 cursor-pointer"       
        />
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default ConversationRow;
