import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils.js/socket";
import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || storedUser?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // -----------------------------
  // 1. Fetch previous chat messages
  // -----------------------------
  const fetchChatMessages = async () => {
    if (!userId || !targetUserId) return;

    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = (chat?.data?.messages || []).map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error("fetchChatMessages error:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    if (userId && targetUserId) fetchChatMessages();
  }, [userId, targetUserId]);

  // -----------------------------
  // 2. Create socket connection ONCE
  // -----------------------------
  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  // -----------------------------
  // 3. Send message through SAME socket
  // -----------------------------
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName || storedUser?.firstName,
      lastName: user.lastName || storedUser?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  // -----------------------------
  // 4. Auto-scroll on new messages
  // -----------------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col m-5 mx-auto h-[70vh] w-1/2 border border-gray-600 rounded-lg">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          const isSender =
            (user.firstName || storedUser?.firstName) === msg.firstName;

          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header text-lg">
                {msg.firstName + " " + msg.lastName}
              </div>

              <div
                className={
                  isSender
                    ? "chat-bubble bg-green-600 text-white"
                    : "chat-bubble bg-gray-700 text-white"
                }
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 w-5/6 border border-gray-600 text-white rounded-lg p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

/*
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils.js/socket";
import axios from "axios";
import { BASE_URL } from "../Utils.js/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages,setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector(store => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {  
    fetchChatMessages();
  }, []);

  useEffect(() => { 
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {firstName: user.firstName , userId, targetUserId});

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + ": " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    }
  },[userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId, 
      targetUserId, 
      text: newMessage
    });
    setNewMessage("");
  };

  return (
      <div className = "flex flex-col m-5 mx-auto h-[70vh] w-1/2 border border-gray-600 rounded-lg">
        <h1 className = "p-5 border-b border-gray-600"> Chat </h1>
        <div className= "flex-1 overflow-scroll p-5"> 
          {messages.map((msg, index) => {
            return (
              <div 
                key={index} 
                className= {
                  "chat " + 
                  (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
              <div className="chat-header text-lg">
                {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble">{msg.text}</div>
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
*/