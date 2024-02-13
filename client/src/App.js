import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("chat-room");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
    </div>
  );
}

export default App;
