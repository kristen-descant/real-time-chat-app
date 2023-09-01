import Forum from "../components/Forum";
import PostList from "../components/PostList";

export default function ForumPage() {
    return (
    <div className="flex flex-col items-center mt-2">
    <Forum/>
    <PostList/>
    </div>
    );
  }