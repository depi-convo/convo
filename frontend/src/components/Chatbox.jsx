import { useState, useEffect, useRef } from "react";

const Chatbox = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hey! How are you?",
      sender: "other",
      timestamp: new Date("2023-10-26T10:30:00Z"),
      read: true,
    },
    {
      text: "I'm doing great, thanks!",
      sender: "user",
      timestamp: new Date("2023-10-26T10:35:00Z"),
      read: true,
    },
    {
      text: "What are you up to?",
      sender: "other",
      timestamp: new Date("2023-10-26T10:40:00Z"),
      read: false,
    },
    {
      text: "Just working on a project.",
      sender: "user",
      timestamp: new Date(),
      read: false,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "user",
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-slate-700">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
          />
          {user.isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          )}
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <p className="text-xs text-green-500">
            {user.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};
