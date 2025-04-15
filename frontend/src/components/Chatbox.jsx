"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

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
  const messagesContainerRef = useRef(null);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input.trim(),
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

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date) => date.toLocaleDateString();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 transition-colors duration-300 overflow-hidden">
      {/* Header */}
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
          <Label className="font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </Label>
          <Label className="text-xs text-green-500">
            {user.isOnline ? "Online" : "Offline"}
          </Label>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          height: "calc(100vh - 180px)",
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col",
              message.sender === "user" ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "p-3 rounded-2xl max-w-[60%] break-words break-all whitespace-pre-wrap text-white shadow-sm transition-all duration-300",
                message.sender === "user" ? "bg-gray-500" : "bg-gray-600",
              )}
            >
              {message.text}
              <div className="text-xs text-gray-400 mt-1 flex items-center justify-end">
                {formatTime(message.timestamp)}
                {message.sender === "user" && (
                  <span className="ml-2">
                    {message.read ? "read" : "delivered"}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(message.timestamp)}
            </p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex flex-row space-x-2 bg-white dark:bg-slate-800 mt-auto justify-center items-center">
        <Textarea
          className="resize-none"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              // Shift + Enter → send the message
              e.preventDefault(); // prevents newline from being added
              handleSendMessage();
            }
            // Otherwise, Enter alone → adds a newline by default
          }}
        />
        <Button variant="send" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
