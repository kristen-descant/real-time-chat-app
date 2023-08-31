import FriendsList from "../components/FriendsList";
import ForumsList from "../components/ForumList";

export default function HomePage() {
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