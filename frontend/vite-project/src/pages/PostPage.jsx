import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Post from "../components/Post"
import { CommentsList } from "../components/Comments";

export default function PostPage() {
  const { forum_id ,post_id} = useParams();

  return (
    <>
      <Post />
      <CommentsList post_id = {post_id}/>
    </>
  );
}