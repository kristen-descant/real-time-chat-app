import tempPic from '../media/pngwing.com (1).png'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { api } from '../pages/utility';

// get all messages for user and show previews. onclick set userTomessage to that messages other user

export default function MessagePreviews() {

    const {setUsertoMessage, user, userInfo} = useOutletContext();
    // const [messageList, setMessageList] = useState(messages);
    const [chatRooms, setChatRooms] = useState(null);
    const [messageLength, setMessageLength] = useState(null);

    const getChats = async() => {
        try {
            console.log(api.defaults.headers.common)
            const response = await api.get('chat/')
            console.log(response)
            const messages = response.data
            console.log(messages)
            setChatRooms(messages)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getChats();
    }, [user])

    const messageOnClick = (friend) => {
        // event.stopPropagation();
        setUsertoMessage(friend)
    }

  
    return (
        <ul className='mt-8'>
            {chatRooms &&
            (chatRooms.map((message, index) => (
                message.messages.length > 0 && 
                <li className='mb-2 border rounded flex flex-row' key={index} onClick={() => messageOnClick(message.users[0].id === userInfo.id ? message.users[1] : message.users[0])}>
                    <div>
                        {/* <img src={message.users[0].id === userInfo.id ? message.users[1].profile_pciture : message.users[0].profile_pciture} alt="" /> */}
                        <img className='h-8 md:h-12 rounded-full' src={tempPic} alt="" />
                    </div>
                    <div className='flex flex-col w-[75%] border border-[black] ml-3'>
                        <div className='mr-5 pl-3'>
                            {message.users[0].id === userInfo.id ? message.users[1].display_name : message.users[0].display_name}
                        </div>
                        <div className='flex flex-col'>
                            {message.messages[message.messages.length-1].content.split("'")[1]}
                        </div>
                    </div>
                </li>
            )))
            }
        </ul>
    );
}
