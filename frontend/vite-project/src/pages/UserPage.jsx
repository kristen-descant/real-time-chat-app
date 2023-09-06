import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import users from "../data/users.json";

// This page needs to be refactored with data from API

export default function UserPage() {
  const {user} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        navigate('/signin');
      }
    };

    verifyUser();
  }, [user]); 
  
  const { user_id } = useParams();
  // const isCurrentUser = parseInt(user_id) === user.id;

  const isFriend = user.friends_list.includes(parseInt(user_id));

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-color_palette_1 border-2 border-color_palette_5 w-1/2 h-fit relative">
        {isCurrentUser && !isFriend && (
          <button className="absolute top-1 left-1 p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Add Friend
          </button>
        )}
        {!isFriend && isCurrentUser && (
          <button className="absolute top-1 right-1 p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Message
          </button>
        )}
        <div className="flex flex-col justify-center items-center space-y-4 p-2">
          <img
            src={user.profile_picture}
            className="border-2 border-black rounded-full max-w-full max-h-40"
          />
          <h1 className=" text-lg font-bold">
            {user.email || "Placeholder Email"}
          </h1>
          <h2>About me</h2>
          <p className="p-2 border-2 border-[black] bg-[white]">
            email : {user.email}
          </p>
          <button className="p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
}
