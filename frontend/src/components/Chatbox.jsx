import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Chatbox = ({ contact }) => {
  // Receive contact info as prop
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

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [messages]);

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
    // Header (avatar & active status)
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={contact.profilePic} alt={contact.name} />
          <AvatarFallback>
            {contact.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-sm text-gray-500">
            {contact.isActive ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Chatbox */}
      <div className="h-[700px] w-full">
        <ScrollArea className="h-full w-full">
          <div className="p-4 space-y-2">
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
                    "p-2 rounded-lg max-w-[70%]",
                    message.sender === "user" ? "bg-blue-100" : "bg-gray-100",
                  )}
                >
                  {message.text}
                  <div
                    className={`text-xs text-gray-500 mt-1 flex items-center justify-end}`}
                  >
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
        </ScrollArea>
      </div>

      {/* Input box */}
      <div className="p-4 border-t flex space-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chatbox;
