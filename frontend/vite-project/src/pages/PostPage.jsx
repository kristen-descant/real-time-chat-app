import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Post from "../components/Post"

export default function PostPage() {

  const {user} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        navigate('/signin');
      }
    };

    verifyUser();
  }, [user, navigate]); 

  return (
    <Post />
  );
}