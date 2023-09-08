import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import MessagePreviews from "../components/MessagePreview";
import FriendsList from "../components/FriendsList";

export default function MessagePage() {

  const {userToMessage, user} = useOutletContext();
  const [messages, setMessages] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    {userToMessage ?
      <Chat messages={messages}/> :
      <div className="flex flex-row ml-[5%]">
        <FriendsList/> 
        <div className="w-[60%] ml-[5%]">
          <MessagePreviews setMessages={setMessages}/>
        </div>
      </div>
    }
    </>
  );
}