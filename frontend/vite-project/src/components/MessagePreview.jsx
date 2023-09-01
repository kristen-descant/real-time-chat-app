import messages from '../data/messges.json'
import chatRoom from '../data/chatRoom.json'
import userList from '../data/users.json'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

// get all messages for user and show previews. onclick set userTomessage to that messages other user

export default function MessagePreviews() {

    const {setUserToMessage} = useOutletContext();
    const [messageList, setMessageList] = useState(messages);
    const [chatRoomList, setChatRoom] = useState(chatRoom);

    const handleOnClick = () => {
        
    }

  
    return (
        <ul className='mt-8'>
            {chatRoomList.map((message, index) => (
                <li className='mb-2 border rounded flex flex-row' key={index} onClick={() => handleOnClick(message)}>
                    <div className='mr-5 pl-3 flex items-center'>
                        {message.users}
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-center'>
                            {message.users}
                        </div>
                        <div>
                            {message.messages[messages.length-1].content}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
