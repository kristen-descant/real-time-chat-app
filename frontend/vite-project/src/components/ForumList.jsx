import forumsListData from '../data/forums.json'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Forum from './Forum'
import { useEffect } from 'react';
import {api} from '../pages/utility.jsx'

export default function ForumsList() {
    const navigate = useNavigate() 
    const [forumsList, setForumsList] = useState([]);
    const [newForum, setNewForum] = useState([])
    const [textBox, setTextBox] = useState(false)

    useEffect(() => {
        const getAllForums = async() => {
            let response = await api.get(`forum/`)
            let forumData = response.data 
            setForumsList(forumData)
        }
        getAllForums() 
    }, [newForum, setTextBox])

    const addForum = async (e) => {
        e.preventDefault(); 
        try {
            let response = await api.post(`forum/`, {
                title : newForum,
                rating : '1'  
            })
            setTextBox(false) 
            navigate(`forum/${response.data.id}`)
        }
        catch {
            alert('Forum could not be added')

        }

    }
        

    return (
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            
            

            {
                textBox ? (
                <form className="flex flex-col " onSubmit={(e) => addForum(e)}>
                <input 
                className='mb-2 text-center border-[black] border-2 rounded'
                type='text'
                placeholder = 'Forum name'
                value={newForum}
                onChange={(e) => setNewForum(e.target.value)}
                />
                <input className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 " type="submit" />
            </form>

                )
                :
                <button onClick={() => setTextBox(true)} className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 ">Add Forum</button>
            }
            
            
            {/* {!textBox ? false : null} */}
            <ul className='w-full flex flex-col items-center mt-8 space-y-1'>
                {forumsList.map((forum, index) => (
                    <Forum key={index} forum = {forum}/>
                ))}

            </ul>
        </div>
    )
}