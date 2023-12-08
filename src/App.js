import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("https://chatappbackendserver.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  let joinChat = () => {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);

      setShowChat(true);
    } else {
      alert("Enter the name/roomId...");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 className="top">Join a Chat Room</h3>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Enter the User Name"
          />
          <input
            type="text"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            placeholder="Enter the Room ID"
          />
          <button onClick={joinChat}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={roomId} />
      )}
    </div>
  );
}

export default App;
