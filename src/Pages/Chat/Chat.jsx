import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Adjust the URL to match your server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message); // Send the message to the server
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Chat</h2>
      <div className="border p-2 mb-2 h-64 overflow-y-scroll">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        className="border p-2 w-full"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white w-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
