import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../components/Chat";
import MessagePreviews from "../components/MessagePreview";
import FriendsList from "../components/FriendsList";

export default function MessagePage() {

  const {userToMessage, user} = useOutletContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!user) {
  //       navigate('/signin');
  //     }
  //   };

  //   verifyUser();
  // }, [user]); 

  return (
    <>
    {userToMessage ?
      <Chat/> :
      <div className="flex flex-row ml-[5%]">
        <FriendsList/> 
        <div className="w-[60%] ml-[5%]">
          <MessagePreviews/>
        </div>
      </div>
    }
    </>
  );
}