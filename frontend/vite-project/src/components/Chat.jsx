import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';


function Chat() {

    // const {user, userToMessageId} = useOutletContext();

  const [state, setState] = useState({
    filledForm: false,
    messages: [],
    value: '',
    name: '',
    // room: `user${user.id}user${userToMessageId}`
    room: 'chat',
  });

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
              msg: dataFromServer.message,
            },
          ],
        }));
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Container maxWidth="xs">
        {state.filledForm ? (
          <div className="mt-8">
            <div className="mb-4">Room Name: {state.room}</div>
            <div className="h-80 max-h-80 overflow-auto shadow-none">
              {state.messages.map((message, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader title={message.name} subheader={message.msg} />
                </Card>
              ))}
            </div>
            <form onSubmit={onButtonClicked}>
              <TextField
                label="Write text"
                variant="outlined"
                value={state.value}
                fullWidth
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    value: e.target.value,
                  }))
                }
                className="mt-4"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Send Message
              </Button>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Chat;
