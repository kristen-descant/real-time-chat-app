import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import forumsListData from '../data/forums.json'
import thumbsUp from '../media/pngwing.com (2).png'
import thumbsDown from '../media/pngwing.com (4).png'
import {api} from '../pages/utility.jsx'



export default function Forum({forum}) {

    const { forum_id } = useParams();
    const navigate = useNavigate();
    // console.log(forum_id)
    const [forumsList, setForumsList] = useState([]);
    // console.log(forumsList)
    const [currentForum, setCurrentForum] = useState({})


    // useEffect(() => {
    //     if (forum_id > 0) {
    //         // console.log(forumsList[forum_id - 1])
    //         setCurrentForum(forumsList[forum_id - 1]);
    //         }
    // }, [])

    useEffect(()=>{
      const getAllForums = async() => {
        let response = await api.get('forum/')
        let forumData = response.data 
        let new_id = forumData[forum_id-1]
        setCurrentForum(new_id)
      }
      getAllForums()
    }, [forum_id])
    
   
    // console.log(currentForum)
    


    
  return (
    <>
    {!forum_id ? (
    <div onClick={() => {navigate(`/forum/${forum.id}`)}} className='flex flex-col border-2 rounded border-[black] w-[50%] items-center active:bg-color_palette_4 hover:bg-color_palette_2'>
      <div className="text-xl md:text-2xl" >{forum.title}</div>
    </div>
    ) : (
        <div onClick={() => {navigate(`/forum/${currentForum.id}`)}} className='flex flex-col rounded border-2 border-[black] w-[50%] items-center'>
          <div className="text-xl md:text-2xl" >{currentForum.title}</div>
        </div>
        )
    }
    </>
  );
}
