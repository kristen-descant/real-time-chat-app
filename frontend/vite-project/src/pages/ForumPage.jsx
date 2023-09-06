import Forum from "../components/Forum";
import PostList from "../components/PostList";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function ForumPage() {

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

  return (
    <div className="flex flex-col items-center mt-2">
      <Forum/>
      <PostList/> 
    </div>
  );
}