import tempPic from '../media/pngwing.com (1).png'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { api } from '../pages/utility';

// get all messages for user and show previews. onclick set userTomessage to that messages other user

export default function MessagePreviews(props) {

    const {setUsertoMessage, user, userInfo} = useOutletContext();
    const [chatRooms, setChatRooms] = useState(null);
    const {setMessages} = props;
    const [chatDeleted, setChatDeleted] = useState(false);

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
        setChatDeleted(false);
    }, [user, chatDeleted])

    const messageOnClick = (friend) => {
        // event.stopPropagation();
        setUsertoMessage(friend)
    }

    const handleDeleteMessage = async(e, room_id) => {
        e.stopPropagation();
        try {
            console.log(api.defaults.headers.common)
            const response = await api.delete(`chat/${room_id}`)
            console.log(response)
            setChatDeleted(true);
        } catch(error) {
            console.log(error)
        }
    }
  
    return (
        <div className='w-full mt-8'>
            <h2 className='text:xl md:text-2xl'>Chats</h2>
            <ul className='w-full mt-2'>
                {chatRooms &&
                (chatRooms.map((message, index) => (
                    message.messages.length > 0 && 
                    <li className='mb-2 border rounded flex flex-row justify-between' key={index} onClick={() => 
                    messageOnClick(message.users[0].id === userInfo.id ? message.users[1] : message.users[0],
                    setMessages(message.messages.slice(-100)))}>
                        <div className='ml-1 flex justify-center items-center'>
                            {/* <img src={message.users[0].id === userInfo.id ? message.users[1].profile_pciture : message.users[0].profile_pciture} alt="" /> */}
                            <img className='h-8 md:h-12 rounded-full' src={message.users[0].id === userInfo.id ? message.users[1].profile_picture : message.users[0].profile_picture} alt="" />
                        </div>
                        <div className='flex flex-col w-[85%] ml-3'>
                            <div>
                                {message.users[0].id === userInfo.id ? message.users[1].display_name : message.users[0].display_name}
                            </div>
                            <div >
                                {message.messages[message.messages.length-1].content.split("'")[1]}
                            </div>
                        </div>
                        <div className='flex items-center justify-center border'>
                        <button onClick={(e) => handleDeleteMessage(e, message.room_id)}>Delete</button>
                        </div>
                    </li>
                )))
                }
            </ul>
        </div>
    );
}
