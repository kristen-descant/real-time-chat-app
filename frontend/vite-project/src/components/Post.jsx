import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../pages/utility";
import thumbsUp from "../media/pngwing.com (2).png";
import thumbsDown from "../media/pngwing.com (4).png";
import forumsListData from "../data/forums.json";

export default function Post({ post }) {
  const { forum_id, post_id } = useParams();
  // console.log(post)
  const navigate = useNavigate();
  const [forumsList, setForumsList] = useState([]);
  const [currentForum, setCurrentForum] = useState({});
  const [currentPost, setCurrentPost] = useState('');
  // const [usersReactionUp, setUsersReactionUp] = useState([]);
  // const [upReaction, setUpReaction] = useState(false);
  // const [usersReactionDown, setUsersReactionDown] = useState([]);
  const { userInfo, counter, setCounter } = useOutletContext();
  // console.log(forumsList[0])
  useEffect(() => {
    const getPost = async() => {
      let token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get(`posts/${forum_id}/posts/${post_id}/`)
      console.log(response.data)
      setCurrentPost(response.data)
    }
    if(post_id) {
      getPost()

    }
  }, [currentPost]);
  
  
// console.log(currentPost.title)

  // console.log(currentPost)
  const upVote = async (e) => {
    if (post_id) {
      let response = await api.put(`posts/${forum_id}/posts/${post_id}/`, {
        up: userInfo.data.id,
      });
    } else {
      let response = await api.put(`posts/${forum_id}/posts/${post.id}/`, {
        up: userInfo.data.id,
      });
    }
    setCounter(counter+1)

    // navigate(`/`)
    
  };
  
  const downVote = async (e) => {
    if (post_id) {
      let response = await api.put(`posts/${forum_id}/posts/${post_id}/`, {
        down: userInfo.data.id,
      });
    } else {
      let response = await api.put(`posts/${forum_id}/posts/${post.id}/`, {
        down: userInfo.data.id,
      });
    }
    setCounter(counter+1)
  };
  
  // useEffect(()=>{
    
  // }, [upReaction])
  return (
    <>
      {!post_id ? (
        <div className="flex flex-col border-2 border-[black] w-[50%] items-center">
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
              <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down"
              onClick={(e) => downVote(e)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border-2 border-[black] w-[50%] items-center">
          <div
            className="text-xl md:text-2xl"
            onClick={() => {
              navigate(`/forum/${forum_id}/post/${post_id}`);
            }}
          >
            {currentPost.title}
          </div>

          <div className="flex flex-row justify-around w-1/3 mt-2">
            <div className="flex flex-row">
              <span className="mr-2 text-[green]">{currentPost.up}</span>
              <button >
                {" "}
                <img
                  className="h-3 md:h-5"
                  src={thumbsUp}
                  alt="thumbs up"
                  onClick={(e) => upVote(e)}
                />
              </button>
            </div>
            <div className="flex flex-row">
              <span className="mr-2 text-[red]">{currentPost.down}</span>
              <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down" 
              onClick={(e) => downVote(e)}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
