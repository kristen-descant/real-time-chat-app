import forumsListData from '../data/forums.json'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Post from './Post';


export default function PostList() {

    const { forum_id } = useParams();
    const [forumsList, setForumsList] = useState(forumsListData);
    const [postList, setPostList] = useState(forumsList[forum_id-1].posts)
    

    return (
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            <button className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 ">Add Forum</button>
            <ul className='w-full flex flex-col items-center mt-8 space-y-1'>
                {postList.map((post, index) => (
                    <Post key={index} post = {post} forum={forumsList[forum_id-1]}/>
                ))}
            </ul>
        </div>
    )
}