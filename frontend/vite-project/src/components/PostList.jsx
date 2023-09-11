import forumsListData from "../data/forums.json";
import { useNavigate, useParams, useOutletContext, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "./Post";
import { api } from "../pages/utility.jsx";

export default function PostList() {
  const { forum_id } = useParams();
  const [forumsList, setForumsList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [textBox, setTextBox] = useState(false);
  const [upReaction, setUpReaction] = useState(false);
  const [countPosts, setCountPosts] = useState(0)
  const {counter, setCounter} = useOutletContext() 


  

  useEffect(() => {
    const getAllPosts = async () => {
      let response = await api.get(`posts/${forum_id}/posts/`);
      let postData = response.data;
      setPostList(postData);
    };
    getAllPosts();
  }, [countPosts]);
//   console.log(newPost)

  useEffect(() => {
    setCountPosts(countPosts+1)
  }, [counter])

  const addPosts = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post(`posts/${forum_id}/posts/`, {
        content: newPost,
        title: title,
      });
      setTextBox(false);
      setNewPost("");
      setTitle("");
    } catch {
      alert("Post not added!");
    }
  };
  console.log("POST LSIT: ", postList)
  return (
    <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
      {textBox ? (
        <form
          className="flex flex-col overflow-auto"
          onSubmit={(e) => addPosts(e)}
        >
          <input
            className="mb-2 text-center border-[black] border-2 rounded"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="mb-2 flex flex-wrap text-center border-[black] border-2 rounded"
            placeholder="content (limit 255 chracters)"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <input className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 " type="submit" />
        </form>
      ) : (
        <button
          onClick={() => setTextBox(true)}
          className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 "
        >
          Add Post
        </button>
      )}
      {postList && (
      <ul className="w-full flex flex-col items-center mt-8 space-y-1">
        {postList.map((post, index) => (
          <Post key={index} post={post} />
          // forum={forumsList[forum_id-1]
        
        ))}
      
      </ul>
      )}

    </div>
  );
}
