import forumsListData from '../data/forums.json'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Forum from './Forum'


export default function ForumsList() {

    const [forumsList, setForumsList] = useState(forumsListData);

    return (
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            <button className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 ">Add Forum</button>
            <ul className='w-full flex flex-col items-center mt-8 space-y-1'>
                {forumsList.map((forum, index) => (
                    <Forum key={index} forum = {forum}/>
                ))}
            </ul>
        </div>
    )
}