import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../pages/utility";
import thumbsUp from "../media/pngwing.com (2).png";
import thumbsDown from "../media/pngwing.com (4).png";
import trash from "../media/trash.png";

export default function Post({ post }) {
  const { forum_id, post_id } = useParams();
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedPost, setEditedPost] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const { userInfo, counter, setCounter } = useOutletContext();
  // console.log(post)

  useEffect(() => {
    const getPost = async () => {
      let token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get(`posts/${forum_id}/posts/${post_id}/`);
      // console.log(response.data)
      setCurrentPost(response.data);
    };
    if (post_id) {
      getPost();
    }
  }, []);

  const editPost = async (e) => {
    e.stopPropagation();
    if (post_id) {
      let response = await api.put(`posts/${forum_id}/posts/${post_id}/`, {
        content: editedPost,
        title: editedTitle,
        edited: true,
      });
    } else {
      let response = await api.put(`posts/${forum_id}/posts/${post.id}/`, {
        content: editedPost,
        title: editedTitle,
        edited: true,
      });
    }
    setCounter(counter + 1);
  };

  const deletePost = async () => {
    try {
      if (post_id) {
        let response = await api.delete(`posts/${forum_id}/posts/${post_id}/`);
        navigate(`/forum/${forum_id}`);
      } else {
        let response = await api.delete(`posts/${forum_id}/posts/${post.id}/`);
      }
      setCounter(counter + 1);
    } catch {
      alert("Post could not be deleted");
    }
  };

  // console.log(currentPost.title)

  // console.log(currentPost)
  const upVote = async (e) => {
    if (post_id) {
      let response = await api.put(`posts/${forum_id}/post/${post_id}/`, {
        up: userInfo.data.id,
      });
    } else {
      let response = await api.put(`posts/${forum_id}/post/${post.id}/`, {
        up: userInfo.data.id,
      });
    }
    setCounter(counter + 1);

    // navigate(`/`)
  };

  const downVote = async (e) => {
    if (post_id) {
      let response = await api.put(`posts/${forum_id}/post/${post_id}/`, {
        down: userInfo.data.id,
      });
    } else {
      let response = await api.put(`posts/${forum_id}/post/${post.id}/`, {
        down: userInfo.data.id,
      });
    }
    setCounter(counter + 1);
  };
  // console.log(post.edited)
  return (
    <>
      {!post_id ? (
        <div className="flex flex-col border-2 rounded border-[black] w-[50%] items-center hover:bg-color_palette_1 relative">
          <div
            className="text-xl md:text-2xl"
            onClick={() => {
              navigate(`/forum/${forum_id}/post/${post.id}`);
            }}
          >
            {post.title}
          </div>
          <div className="text-xl md:text-l text-center">{post.content}</div>
          <div className="flex flex-row justify-around w-1/3 mt-2">
            <div className="flex flex-row">
              <span className="mr-2 text-[green]">{post.up.length}</span>
              <img
                className="h-3 md:h-5"
                src={thumbsUp}
                alt="thumbs up"
                onClick={(e) => upVote(e)}
              />
            </div>
            <div className="flex flex-row">
              <span className="mr-2 text-[red]">{post.down.length}</span>
              <img
                className="h-3 md:h-5"
                src={thumbsDown}
                alt="thumbs down"
                onClick={(e) => downVote(e)}
              />
            </div>
          </div>
          <img
            className="absolute top-1 right-1 h-6 w-6"
            src={trash}
            onClick={() => deletePost()}
          />
          <div className="absolute bottom-1 left-1">
            Edited : {post.edited.toString()}
          </div>
          {userInfo && (
            <button
              className={`p-0.5 rounded text-xs absolute bottom-1 right-1 ${
                post.created_by !== userInfo.data.id ? 'border-0' : 'border'
              } disabled:text-color_palette_3 hover:bg-color_palette_1 ${
                post.created_by !== userInfo.data.id ? 'opacity-0 pointer-events-none' : ''
              }`}
              disabled={post.created_by != userInfo.data.id}
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit Post
            </button>
          )}
          {editing && (
            <form
              className="flex flex-col overflow-auto"
              onSubmit={(e) => editPost(e)}
            >
              <input
                className="mb-2 text-center border-[black] border-2 rounded"
                type="text"
                placeholder="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="mb-2 flex flex-wrap text-center border-[black] border-2 rounded"
                placeholder="content (limit 255 chracters)"
                value={editedPost}
                onChange={(e) => setEditedPost(e.target.value)}
              />
              <input
                className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 "
                type="submit"
              />
            </form>
          )}
        </div>
      ) : (
        <div className="flex flex-col border-2 border-[black] w-[50%] items-center relative">
          <div
            className="text-xl md:text-2xl"
            onClick={() => {
              navigate(`/forum/${forum_id}/post/${post_id}`);
            }}
          >
            {currentPost.title}
          </div>
          <div className="flex flex-row justify-around w-1/3 mt-2">
            {!currentPost ? (
              <div className="flex flex-row">
                <span className="mr-2 text-[green]">{currentPost.up}</span>
                <img
                  className="h-3 md:h-5"
                  src={thumbsUp}
                  alt="thumbs up"
                  onClick={(e) => upVote(e)}
                />
              </div>
            ) : (
              <div className="flex flex-row">
                <span className="mr-2 text-[green]">
                  {currentPost.up.length}
                </span>
                <img
                  className="h-3 md:h-5"
                  src={thumbsUp}
                  alt="thumbs up"
                  onClick={(e) => upVote(e)}
                />
              </div>
            )}

            {!currentPost ? (
              <div className="flex flex-row">
                <span className="mr-2 text-[red]">{currentPost.down}</span>
                <img
                  className="h-3 md:h-5"
                  src={thumbsDown}
                  alt="thumbs down"
                  onClick={(e) => downVote(e)}
                />
              </div>
            ) : (
              <div className="flex flex-row">
                <span className="mr-2 text-[red]">
                  {currentPost.down.length}
                </span>
                <img
                  className="h-3 md:h-5"
                  src={thumbsDown}
                  alt="thumbs down"
                  onClick={(e) => downVote(e)}
                />
              </div>
            )}
          </div>
          <img
            className="absolute top-1 right-1 h-6 w-6"
            src={trash}
            onClick={() => deletePost()}
          />
          {userInfo && (
            <button
              className={`p-0.5 rounded text-xs absolute bottom-1 right-1 ${
                currentPost.created_by !== userInfo.data.id ? 'border-0' : 'border'
              } disabled:text-color_palette_3 hover:bg-color_palette_1 ${
                currentPost.created_by !== userInfo.data.id ? 'opacity-0 pointer-events-none' : ''
              }`}
              disabled={currentPost.created_by != userInfo.data.id}
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit Post
            </button>
          )}
          {editing && (
            <form
              className="flex flex-col overflow-auto"
              onSubmit={(e) => editPost(e)}
            >
              <input
                className="mb-2 text-center border-[black] border-2 rounded"
                type="text"
                placeholder="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="mb-2 flex flex-wrap text-center border-[black] border-2 rounded"
                placeholder="content (limit 255 chracters)"
                value={editedPost}
                onChange={(e) => setEditedPost(e.target.value)}
              />
              <input
                className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 "
                type="submit"
              />
            </form>
          )}
        </div>
      )}
    </>
  );
}
