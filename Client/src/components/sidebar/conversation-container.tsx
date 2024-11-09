import { useState } from "react";
import useGetConversations from "../../services/get-users.service";
import ConversationRow from "./particular-conversion";

export interface DeleteProp {
	id?:string;
	enableDelete:boolean
}
const ConversationContainer = () => {
	const [forDelete,setForDelete] = useState<DeleteProp>({id:"",enableDelete:false})
	const { loading, userContact } = useGetConversations(forDelete);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{userContact.map((conversation, idx) => (
				<ConversationRow
					key={conversation._id}
					userContact={conversation}
					lastIdx={idx === userContact.length - 1}
					setDelete = {setForDelete}
				/>
			))}
			

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default ConversationContainer;



