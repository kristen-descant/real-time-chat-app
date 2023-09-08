import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./utility";
import image from '../media/pngwing.com (1).png'


// This page needs to be refactored with data from API

export default function UserPage() {
  const {user, friendList, userInfo, setUsertoMessage} = useOutletContext();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState();
  const [isFriend, setIsFriend] = useState();
  const [userToView, setUserToView] = useState(null);
  
  const getUserToView = async() => {
    const response = await api.get(`users/profile/${user_id}`)
    setUserToView(response)
    console.log(response)
  }

  useEffect(() => {
    getUserToView();
  }, [user, user_id])

  useEffect(() => {
    if (userInfo) {
    setIsCurrentUser(Number(user_id) === userInfo.data.id);
      // Use the find method with a callback function to search for a matching id
    const foundFriend = friendList.find((friend) => friend.id === Number(user_id));

    // Check if a friend with the specified id was found
    setIsFriend(!!foundFriend);

    }
  }, [userToView])

  const handleAddFriend = async() => {
    try {
      const response = await api.post(`/users/users/add/${user_id}`)
      setIsFriend(true)
    } catch(error) {
      console.log(error)
    }
  };

  const handleRemoveFriend = async() => {
    try {
      const response = await api.post(`/users/users/remove/${user_id}`)
      setIsFriend(false)
    } catch(error) {
      console.log(error)
    }
  };

  const messageOnClick = (event, friend) => {
    event.stopPropagation();
    setUsertoMessage(friend)
    navigate('/message')
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      {userToView && 
      <div className="bg-color_palette_1 border-2 border-color_palette_5 w-1/2 h-fit relative">
        {!isCurrentUser && (!isFriend ? (
          <button onClick={handleAddFriend}  className="absolute top-1 left-1 p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Add Friend
          </button>) :
          (<button onClick={handleRemoveFriend}  className="absolute top-1 left-1 p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Remove Friend
          </button>)
        )}
        {!isCurrentUser && (
          <button onClick={(e) => messageOnClick(e, userToView.data)}   className="absolute top-1 right-1 p-2 border-2 rounded bg-color_palette_4 hover:bg-color_palette_2 active:bg-color_palette_3">
            Message
          </button>
        )}
        <div className="flex flex-col justify-center items-center space-y-4 p-2">
          {userToView.data.profile_picture ?
          <img
            src={userToView.data.profile_picture}
            className="border-2 border-black rounded-full max-w-full max-h-40"
          /> : <img className="border-2 border-black rounded-full max-w-full max-h-40" src={image}/>}
          <h1 className=" text-lg font-bold">
            {userToView.data.display_name}
          </h1>
          <h1 className=" text-lg font-bold">
            {userToView.data.email}
          </h1>
        </div>
      </div>
      }
    </div>
  );
}
