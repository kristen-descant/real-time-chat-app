import messages from '../data/messges.json'
import chatRoom from '../data/chatRoom.json'
import userList from '../data/users.json'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { api } from '../pages/utility';

// get all messages for user and show previews. onclick set userTomessage to that messages other user

export default function MessagePreviews() {

    const {setUserToMessage, user, userInfo} = useOutletContext();
    // const [messageList, setMessageList] = useState(messages);
    const [chatRooms, setChatRooms] = useState(null);

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

    const handleOnClick = () => {
        
    }

  
    return (
        <ul className='mt-8'>
            {chatRooms &&
            (chatRooms.map((message, index) => (
                <li className='mb-2 border rounded flex flex-row' key={index} onClick={() => handleOnClick(message)}>
                    <div className='mr-5 pl-3 flex items-center'>
                        {message.users[0].id === userInfo.id ? message.users[1].display_name : message.users[0].display_name}
                    </div>
                    <div className='flex flex-col'>
                        
                        {/* <div>
                            {message.messages[messages.length - 1]}
                        </div> */}
                    </div>
                </li>
            )))
            }
        </ul>
    );
}
