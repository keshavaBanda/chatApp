import { useEffect, useState } from "react";
import './App.css';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        message: currentMessage,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    socket.on('receive_message', (receive_message) => {
      console.log(receive_message)
      setMessageList((list) => [...list, receive_message]);
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p> Live Chat with {username} </p>
        
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">

          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}


        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          onChange={(event) => { setCurrentMessage(event.target.value) }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
