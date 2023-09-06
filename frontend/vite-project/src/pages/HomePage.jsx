import FriendsList from "../components/FriendsList";
import ForumsList from "../components/ForumList";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  
  const {user} = useOutletContext();
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
    <div className=" w-full">
        <h2>This is the Home page</h2>
        <div className="flex flex-row justify-around">
        <ForumsList/>
        <FriendsList/>
        </div>
    </div>
  
  );
}