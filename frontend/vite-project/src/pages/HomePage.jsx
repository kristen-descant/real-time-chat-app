import FriendsList from "../components/FriendsList";
import ForumsList from "../components/ForumList";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  
  const {user} = useOutletContext();
  const navigate = useNavigate();
  
  return (
    <div className=" w-full ">
        <div className="flex flex-row justify-around w-full ">
          <ForumsList/>
          <div className="w-[25%] flex justify-end mr-[5%]">
            <FriendsList/>
          </div>
        </div>
    </div>
  
  );
}