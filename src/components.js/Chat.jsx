import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils.js/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages,setMessages] = useState([{text:"Hello"}]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector(store => store.user);
  const userId = user?._id;

  useEffect(() => { 
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {firstName: user.firstName , userId, targetUserId});
  });

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {firstName: user.firstName, userId, targetUserId, text: newMessage});
  }

    
  console.log("Chatting with user ID:", targetUserId);
    return (
      <div className = "flex flex-col m-5 mx-auto h-[70vh] w-1/2 border border-gray-600 rounded-lg">
        <h1 className = "p-5 border-b border-gray-600"> Chat </h1>
        <div className= "flex-1 overflow-scoll p-5"> 
          {messages.map((msg, index) => {
            return (
              <div key={index} className="chat chat-start">
              <div className="chat-header text-lg">
                Valle Ramesh
                  <time className="text-xs opacity-50 px-2 pt-[3px]">2 hours ago</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            );
          })}
        </div>
          <div className = "p-5 border-t border-gray-600 flex items-center gap-3">
            <input 
              value={newMessage} 
              onChange = {(e) => setNewMessage(e.target.value)} 
              className = "flex=1 w-5/6 border border-gray-600 test-white rounded-lg p-2 " placeholder="Type a message..." />
            <button onClick = {sendMessage} className = "btn btn-primary"> Send </button>
          </div>
      </div>
    );
};

export default Chat;