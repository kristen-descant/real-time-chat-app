import friends from '../data/users.json'
import { useState } from 'react'
import { useNavigate, useOutletContext } from "react-router-dom";


export default function FriendsList() {

    const [friendList, setFriendsList] = useState(friends);
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/user/userId')
    }

    return (
        <div className='h-[60%] w-[15%] text-center'>
            <h2 className='text:xl md:text-2xl'>Friends</h2>
            <div className="h-full w-full border border-[black] flex flex-col overflow-y-scroll">
                {friendList.map((friend) => (
                    <div onClick={handleOnClick} key={friend.id} className='h-12 border-b-[black] border flex flex-row justify-between'>
                        <img className='h-full border border-[black] rounded-full' src={friend.profile_picture} alt="" />
                        <div className='w-[50%]'>{friend.display_name}</div>
                    </div>
                ))}            
            </div>
        </div>
    )
}