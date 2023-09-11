// import friends from '../data/users.json'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from '../pages/utility';
import axios from 'axios';


export default function FriendsList() {

    
    const navigate = useNavigate();
    const {userInfo, user, friendList, setUsertoMessage} = useOutletContext();

    const handleOnClick = (friendId) => {
        navigate(`/user/${friendId}`)
    }
    
    const messageOnClick = (event, friend) => {
        event.stopPropagation();
        setUsertoMessage(friend)
        navigate('/message')
    }

    return (
        <div className='h-screen w-[60%] text-center'>
            <div className='h-[70%] w-full mt-8'>
            <h2 className='text:xl md:text-2xl'> <i class="fa-sharp fa-solid fa-user-group fa-lg"></i>Friends</h2>
            {friendList && 
            <div  className="h-full w-full border border-[black] flex flex-col overflow-y-scroll mt-2 rounded">
                {friendList.map((friend) => (
                    <div onClick={() => handleOnClick(friend.id)}  key={friend.id} className='h-[10vh] border-b-[black] border flex flex-row justify-between bg-color_palette_3 hover:bg-color_palette_1 '>

                        <div className='h-full w-[40%]'>
                            <img className='h-full border border-[black] rounded-full'  src={friend.profile_picture} alt="" />
                        </div>
                        <div className='flex flex-col w-[55%] items-end mr-1 h-full overflow-hidden'>
                            <div className=''>{friend.display_name}</div>
                            <button onClick={(e) => messageOnClick(e, friend)}>Message</button>
                        </div>
                    </div>
                ))}            
            </div> }
            </div>
        </div>
    )
}