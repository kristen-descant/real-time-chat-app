import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import thumbsUp from '../media/pngwing.com (2).png'
import thumbsDown from '../media/pngwing.com (4).png'
import forumsListData from '../data/forums.json'



export default function Post({post}) {

    const { forum_id, post_id } = useParams();
    // console.log(post)
    const navigate = useNavigate();
    const [forumsList, setForumsList] = useState(forumsListData);
    const [currentForum, setCurrentForum] = useState({})
    const [currentPost, setCurrentPost] = useState({})
    // console.log(forumsList[0])

    useEffect(() => {
        
        if (forum_id > 0) {
            // console.log(forumsList[forum_id - 1])
            setCurrentForum(forumsList[forum_id - 1]);
            if (currentForum == {}){
                setCurrentPost(currentForum.posts[post_id-1])
            } 
            }
        
        
    }, [])
    
   
    console.log(currentForum)
    


    
  return (
    <>
    {!post_id ? (
    <div onClick={() => {navigate(`/forum/${forum_id}/post/${post.id}`)}} className='flex flex-col border-2 border-[black] w-[50%] items-center'>
      <div className="text-xl md:text-2xl" >{post.title}</div>
      <div className="flex flex-row justify-around w-1/3 mt-2">
        <div className="flex flex-row">
          <span className="mr-2 text-[green]">{post.up}</span>
          <img className="h-3 md:h-5" src={thumbsUp} alt="thumbs up" />
        </div>
        <div className="flex flex-row">
          <span className="mr-2 text-[red]">{post.down}</span>
          <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down" />
        </div>
      </div>
    </div>
    ) : (
        <div onClick={() => {navigate(`/forum/${forum_id}/post/${post_id}`)}} className='flex flex-col border-2 border-[black] w-[50%] items-center'>
          <div className="text-xl md:text-2xl" >{currentPost.title}</div>
          <div className="flex flex-row justify-around w-1/3 mt-2">
            <div className="flex flex-row">
              <span className="mr-2 text-[green]">{currentPost.up}</span>
              <img className="h-3 md:h-5" src={thumbsUp} alt="thumbs up" />
            </div>
            <div className="flex flex-row">
              <span className="mr-2 text-[red]">{currentPost.down}</span>
              <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down" />
            </div>
          </div>
        </div>
        )
    }
    </>
  );
}
