import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Chat() {

    const {user, userToMessage, userInfo} = useOutletContext();
    const [thisUserId, setThisUserId] = useState(null);
    console.log(user)
    const setUserId = () => {
        setThisUserId(userInfo.data.id)
    }

    useEffect(() => {
        setUserId()
    }, [userInfo])
    // const [userId, setUserId] = useState('');
    const [state, setState] = useState({
        filledForm: false,
        messages: [],
        value: '',
        name: '',

        room: `user${userInfo.data.id}user${userToMessage.id}`
        // room: 'chat',
    });

    console.log(userInfo)


    const client = new W3CWebSocket(
        'ws://127.0.0.1:8000/ws/' + state.room + '/'
    );

    const onButtonClicked = (e) => {
        client.send(
        JSON.stringify({
            message: [state.value, thisUserId],
            user: userInfo.data.id
        })
        );
        setState((prevState) => ({
        ...prevState,
        value: '',
        
        }));
        e.preventDefault();
    };

    useEffect(() => {
        client.onopen = () => {
        console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
        
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            console.log(dataFromServer)
            setState((prevState) => ({
            ...prevState,
            messages: [
                ...prevState.messages,
                {
                message: dataFromServer.message,

                user: dataFromServer.user

//                 user: userInfo.id
                },
            ],
            }));
        }
        };
    }, []);

    console.log(state.messages)
    
    console.log(userInfo.data.id)
    

    return (
        <div className="h-screen bg-gray-100 flex justify-center overflow-hidden">
        <div className='w-full flex justify-center relative h-[95%]'>
             
            <div className="mt-8 h-[80%] w-[50%] flex flex-col items-center">
                <div className="mb-4 flex flex-row items-center"> <img className='h-5 md:h-8 rounded-full mr-2' src={userToMessage.profile_picture} /> {userToMessage.display_name}</div>
                <div className='h-[80%] w-full'>
                    <div className="h-[85%] overflow-x-hidden overflow-y-auto shadow-none w-full flex flex-col items-center">
                    {state.messages.map((message, index) => (
                    <div key={index} className='mb-4 mr-4 w-fit md:w-3/4 ' >
                        <div  className={`  p-1 whitespace-normal overflow-x-hidden  rounded ${message.message[1] === userInfo.data.id ? 'bg-color_palette_2' : 'bg-[white]'}`} >
                        {message.message}
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
                <form className='flex flex-row items-center w-full md:w-3/4 h-[10%] ' onSubmit={onButtonClicked}>
                <textarea
                   
                    rows={3}
                    
                    value={state.value}
                    style={{ resize: 'none' }}
                    onChange={(e) =>
                    setState((prevState) => ({
                        ...prevState,
                        value: e.target.value,
                    }))
                    }
                    className="w-3/4 rounded border border-[black]"
                ></textarea>
                <button
                    type="submit" 
                    className="ml-2 border border-[black] bg-color_palette_4 p-1 rounded h-fit"
                >
                    Send Message
                </button>
                </form>
            </div>
            
        </div>
        </div>
    );
    }

    export default Chat;
