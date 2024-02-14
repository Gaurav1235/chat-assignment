import './App.css';
import io, { Socket } from 'socket.io-client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import Chat from './Chat';

const socket: Socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('chat-room');
  const [showChat, setShowChat] = useState<boolean>(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
            onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
              event.key === 'Enter' && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
