import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import forumsListData from '../data/forums.json'
import thumbsUp from '../media/pngwing.com (2).png'
import thumbsDown from '../media/pngwing.com (4).png'



export default function Forum({forum}) {

    const { forum_id } = useParams();
    const navigate = useNavigate();
    // console.log(forum_id)
    const [forumsList, setForumsList] = useState(forumsListData);
    // console.log(forumsList)
    const [currentForum, setCurrentForum] = useState({})


    useEffect(() => {
        if (forum_id > 0) {
            // console.log(forumsList[forum_id - 1])
            setCurrentForum(forumsList[forum_id - 1]);
            }
    }, [])
    
   
    // console.log(currentForum)
    


    
  return (
    <>
    {!forum_id ? (
    <div onClick={() => {navigate(`/forum/${forum.id}`)}} className='flex flex-col border-2 border-[black] w-[50%] items-center'>
      <div className="text-xl md:text-2xl" >{forum.title}</div>
      <div className="flex flex-row justify-around w-1/3 mt-2">
        <div className="flex flex-row">
          <span className="mr-2 text-[green]">{forum.up}</span>
          <img className="h-3 md:h-5" src={thumbsUp} alt="thumbs up" />
        </div>
        <div className="flex flex-row">
          <span className="mr-2 text-[red]">{forum.down}</span>
          <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down" />
        </div>
      </div>
    </div>
    ) : (
        <div onClick={() => {navigate(`/forum/${currentForum.id}`)}} className='flex flex-col border-2 border-[black] w-[50%] items-center'>
          <div className="text-xl md:text-2xl" >{currentForum.title}</div>
          <div className="flex flex-row justify-around w-1/3 mt-2">
            <div className="flex flex-row">
              <span className="mr-2 text-[green]">{currentForum.up}</span>
              <img className="h-3 md:h-5" src={thumbsUp} alt="thumbs up" />
            </div>
            <div className="flex flex-row">
              <span className="mr-2 text-[red]">{currentForum.down}</span>
              <img className="h-3 md:h-5" src={thumbsDown} alt="thumbs down" />
            </div>
          </div>
        </div>
        )
    }
    </>
  );
}
