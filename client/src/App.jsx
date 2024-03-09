import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat'
const socket = io.connect("http://localhost:3001")
const App = () => {
  const [username, setUsername] = useState("")
  const [isJoined, setIsJoined] = useState(true)
  const [room, setRoom] = useState("")
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setIsJoined(false)
    }
  }
  return (
    <div className="App">
      {(isJoined) ?
        <div className='joinChatContainer'>
          <h3>JOIN A CHAT</h3>
          <input type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
          <input type='text' placeholder='Room' onChange={(event) => setRoom(event.target.value)} />
          <button onClick={joinRoom}>JOIN CHAT</button>
        </div>
        :
        <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
