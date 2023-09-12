import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { api } from '../pages/utility';

function Chat(props) {

    const {user, userToMessage, userInfo, setUsertoMessage, setMessages, messages} = useOutletContext();
    const [thisUserId, setThisUserId] = useState(null);
    const bottomEl = useRef(null);

    const setUserId = () => {
        setThisUserId(userInfo.data.id)
    }

    useEffect(() => {
        setUserId()
    }, [userInfo])

    const [state, setState] = useState({
        filledForm: false,
        messages: [],
        value: '',
        name: '',

        room: `user${userInfo.data.id}user${userToMessage.id}`
        // room: 'chat',
    });
    console.log(state.room)
    console.log(messages)

    const getMessages = async() => {
        try {
            console.log(api.defaults.headers.common)
            const response = await api.get(`chat/${userToMessage.id}`)
            console.log(response)
            const messageData = response.data
            console.log(messageData.messages)
            setMessages(messageData.messages.slice(-100))
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
        getMessages();
        
    }, [userToMessage])

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

    const handleGoBack = () => {
        setUsertoMessage(null);
    }
    
    const scrollToBottom = () => {
        bottomEl?.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className="h-screen bg-gray-100 flex justify-center overflow-hidden">
        <div className='w-full flex justify-center relative h-[95%]'>
            {console.log(userToMessage)}
             <div>
                <button className='border rounded p-1 hover:bg-color_palette_1' onClick={handleGoBack}>Back</button>
             </div>
            <div className="mt-8 h-[80%] w-[40%] flex flex-col items-center">
                <div className="mb-4 flex flex-row items-center"> <img className='h-5 md:h-8 rounded-full mr-2' src={userToMessage.profile_picture} /> {userToMessage.display_name}</div>
                <div className='h-[80%] w-full'>
                    <div className="h-[85%] overflow-x-hidden overflow-y-auto shadow-none w-full flex flex-col items-center ">
                        {console.log(messages)}
                        {messages && 
                        <div className=' w-full'>
                            {messages && messages.map((message, index) => (
                                <div key={index} className={`mr-none mb-4 min-w-full md:w-3/4 flex flex-col ${message.sender === userInfo.data.id ? 'items-end' : 'items-start'}`} >
                                <div className={`w-[60%] p-1 whitespace-normal overflow-x-hidden  rounded ${message.sender === userInfo.data.id ? 'bg-color_palette_2 mr-1 ' : 'bg-[white] ml-1'}`}  >
                                {message.content.split("'")[1].split("\\n")[0]}
                                </div>
                            </div>
                            ))}
                        </div>}
                        <div className='h-full w-full'>
                            {state.messages.map((message, index) => (
                            <div key={index} className={`mb-4 min-w-full md:w-3/4 flex flex-col ${message.message[1] === userInfo.data.id ? 'items-end' : 'items-start'}`} >
                                <div  className={`w-[60%]  p-1 whitespace-normal overflow-x-hidden  rounded ${message.message[1] === userInfo.data.id ? 'bg-color_palette_2 mr-1' : 'bg-[white] ml-1'}`} >
                                {message.message[0]}
                                </div>
                            </div>
                            ))}
                            <div ref={bottomEl}></div>
                        </div>
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
