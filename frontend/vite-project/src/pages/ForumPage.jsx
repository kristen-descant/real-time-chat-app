import Forum from "../components/Forum";
import PostList from "../components/PostList";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ForumPage() {

  const {user} = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-2">
      <Forum/>
      <PostList/>
    </div>
  );
}