import { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

const Chatbox = ({ chat, onSendMessage, user, isMobile = false }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(chat.id, message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 transition-colors duration-300">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-slate-700">
        <div className="relative flex-shrink-0">
          <img
            src={chat.avatar || "/placeholder.svg"}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
          />
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          )}
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {chat.name}
          </h3>
          <p className="text-xs text-green-500">
            {chat.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-slate-900"
        style={{ height: "calc(100% - 130px)" }}
      >
        <div className="space-y-4">
          {chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender !== "me" && (
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                  className="w-8 h-8 rounded-full mr-2 self-end object-cover bg-gray-200 flex-shrink-0"
                />
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-slate-700 dark:text-white rounded-bl-none"
                }`}
              >
                <p className="break-words">{msg.text}</p>
                <div
                  className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-200" : "text-gray-500 dark:text-gray-400"} text-right`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {chat.isTyping && (
            <div className="flex justify-start">
              <img
                src={chat.avatar || "/placeholder.svg"}
                alt={chat.name}
                className="w-8 h-8 rounded-full mr-2 self-end object-cover bg-gray-200 flex-shrink-0"
              />
              <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg bg-gray-200 dark:bg-slate-700 dark:text-white rounded-bl-none">
                <div className="flex space-x-1 items-center typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      >
        <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-2">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mr-2 flex-shrink-0"
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 dark:text-white min-w-0"
          />
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mx-2 flex-shrink-0"
          >
            <FaSmile />
          </button>
          <button
            type="submit"
            className={`p-2 rounded-full flex-shrink-0 ${message.trim() ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            disabled={!message.trim()}
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
