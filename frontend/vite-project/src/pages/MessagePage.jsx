import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import MessagePreviews from "../components/MessagePreview";
import FriendsList from "../components/FriendsList";

export default function MessagePage() {

  const {userToMessage, user} = useOutletContext();
  // const [messages, setMessages] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    {userToMessage ?
      <Chat/> :
      <div className="flex flex-row ml-[5%] w-full">
        <div className="w-[25%]">
          <FriendsList/> 
        </div>
        <div className="w-[50%]">
          <MessagePreviews/>
        </div>
      </div>
    }
    </>
  );
}