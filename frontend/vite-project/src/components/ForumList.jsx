import forumsListData from '../data/forums.json'
import { useState } from 'react'
import thumbsUp from '../media/pngwing.com (2).png'
import thumbsDown from '../media/pngwing.com (4).png'

export default function ForumsList() {

    const [forumsList, setForumsList] = useState(forumsListData);

    return (
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            <button className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 ">Add Forum</button>
            <ul className='w-full flex flex-col items-center mt-8'>
                {forumsList.map((forum) => (
                    <li key={forum.id} className='border hover:bg-color_palette_1  overflow-hidden border-black mb-5 w-3/4 h-[15vh] rounded flex flex-col items-center justify-center bg-color_palette_3 '>
                        <div className='text-xl md:text-2xl'>{forum.title}</div>
                        <div className='flex flex-row justify-around w-1/3 mt-2'>
                            <div className='flex flex-row'>
                                <span className='mr-2 text-[green]'>{forum.up}</span> 
                                <img className='h-3 md:h-5' src={thumbsUp} alt="thumbs up" />
                            </div>
                            <div className='flex flex-row'>
                                <span className='mr-2 text-[red]'>{forum.down}</span>
                                <img className='h-3 md:h-5' src={thumbsDown} alt="thumbs down" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}