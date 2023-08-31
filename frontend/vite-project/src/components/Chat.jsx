import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { TextField } from '@material-ui/core';


function Chat() {

    const {user, userToMessage} = useOutletContext();
    console.log(user)
    const [userId, setUserId] = useState('');
    const [state, setState] = useState({
        filledForm: false,
        messages: [],
        value: '',
        name: '',
        // room: `user${user.id}user${userToMessage.id}`
        room: 'chat',
    });

    useEffect(() => {
        setUserId(toString(user.id))
    }, []);

    console.log(userId)

    const client = new W3CWebSocket(
        'ws://127.0.0.1:8000/ws/' + state.room + '/' + 'test/'
    );

    const onButtonClicked = (e) => {
        client.send(
        JSON.stringify({
            message: state.value,
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
            setState((prevState) => ({
            ...prevState,
            messages: [
                ...prevState.messages,
                {
                message: dataFromServer.message,
                user: user.id
                },
            ],
            }));
        }
        };
    }, []);

    console.log(state.messages)
    
    console.log(user.id)

    return (
        <div className="h-screen bg-gray-100 flex justify-center">
        <div className='w-full flex justify-center relative'>
            {state.filledForm ? (
            <div className="mt-8 flex flex-col justify-between h-[80%] w-[50%]">
                <div>
                    <div className="mb-4 flex flex-row items-center"> <img className='h-5 md:h-8 rounded-full mr-2' src={userToMessage.profile_picture} /> {userToMessage.display_name}</div>
                    <div className="h-80 max-h-80 overflow-auto shadow-none  ">
                    {state.messages.map((message, index) => (
                    <Card key={index} className='mb-4 mr-4 text-[white] w-full md:w-1/2' >
                        <CardHeader  className={` text-[white] ${message.user === user.id ? 'bg-color_palette_1' : ''}`} title={message.name} subheader={message.message} />
                    </Card>
                    ))}
                    </div>
                </div>
                <form className='flex flex-row items-center w-ful md:w-1/2 absolute left-[30%] bottom-[20%]' onSubmit={onButtonClicked}>
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
            ) : (
            <div>
                <div>
                <form
                    onSubmit={(e) =>
                    setState((prevState) => ({
                        ...prevState,
                        filledForm: true,
                    }))
                    }
                    className="mt-8"
                >
                    <TextField
                    label="Room name"
                    autoFocus
                    value={state.room}
                    onChange={(e) =>
                        setState((prevState) => ({
                        ...prevState,
                        room: e.target.value,
                        }))
                    }
                    className="mb-4"
                    />
                    <TextField
                    label="Sender"
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                        setState((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                        }))
                    }
                    className="mb-4"
                    />
                    <button
                    type="submit"
                    className='border border-[black] rounded p-2'
                    >
                    Submit
                    </button>
                </form>
                </div>
            </div>
            )}
        </div>
        </div>
    );
    }

    export default Chat;
