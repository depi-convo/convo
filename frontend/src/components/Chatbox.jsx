"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FaPaperclip, FaSmile, FaMicrophone, FaStop, FaSearch, FaTimes } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react"; // ايموجي بيكر
import { motion, AnimatePresence } from "framer-motion";
import { sendMessage, sendGroupMessage, getGroupMessages, getConversationMessages } from "../api";

const Chatbox = ({ chat, onSendMessage, user, isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(null);

  const [input, setInput] = useState("");
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const notificationSound = useRef(new Audio("/notification.mp3"));

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      setLoadingMessages(true);
      setErrorMessages(null);
      try {
        if (chat && chat.id) {
          console.log("Fetching messages for chat:", chat.id);
          const data = await getConversationMessages(chat.id);
          console.log("Received messages:", data);
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setErrorMessages("Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };
    
    if (chat && chat.id) fetchMessages();
    else setLoadingMessages(false);
  }, [chat]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = messages.filter((message) =>
        message.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);

      if (results.length > 0) {
        setHighlightedMessage(results[0]);
        const messageElement = document.getElementById(
          `message-${results[0]._id}`
        );
        if (messageElement) {
          messageElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    } else {
      setSearchResults([]);
      setHighlightedMessage(null);
    }
  }, [searchQuery, messages]);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "other"
    ) {
      notificationSound.current
        .play()
        .catch((error) => console.log("Error playing sound:", error));
    }
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    try {
      if (chat && chat.id) {
        onSendMessage(chat.id, input.trim());
        setInput("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setErrorMessages("Failed to send message");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (loadingMessages) return (
    <div className="flex justify-center items-center h-full w-full bg-gray-50 dark:bg-slate-900">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading messages...</p>
      </div>
    </div>
  );
  
  if (errorMessages) return (
    <div className="flex justify-center items-center h-full w-full bg-gray-50 dark:bg-slate-900">
      <div className="p-5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg max-w-md">
        <p className="font-bold mb-2">Error</p>
        <p>{errorMessages}</p>
      </div>
    </div>
  );

  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = formatDate(message.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const isCurrentUser = (senderId) => {
    return user && (user.id === senderId || user._id === senderId);
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="text-center p-6 bg-gray-50 dark:bg-slate-700/30 rounded-lg max-w-md">
            <p className="text-gray-600 dark:text-gray-300 mb-2">No messages yet</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Send a message to start the conversation</p>
          </div>
        </div>
      );
    }

    const messageGroups = groupMessagesByDate();
    
    return Object.entries(messageGroups).map(([date, msgs]) => (
      <div key={date} className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-xs text-gray-500 dark:text-gray-400">
            {date}
          </div>
        </div>
        
        <div className="space-y-3">
          {msgs.map((message) => {
            const fromCurrentUser = isCurrentUser(message.sender);
            
            return (
              <div 
                key={message._id} 
                className={`flex ${fromCurrentUser ? 'justify-end' : 'justify-start'} items-end space-x-2`}
              >
                {!fromCurrentUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold">
                        {chat.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`max-w-[70%] ${!fromCurrentUser && 'ml-2'}`}>
                  <div 
                    className={`px-4 py-2 rounded-t-lg ${
                      fromCurrentUser 
                        ? 'bg-indigo-600 text-white rounded-bl-lg rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-white rounded-br-lg rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                  
                  <div className={`flex items-center mt-1 text-xs text-gray-500 ${fromCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{formatTime(message.createdAt)}</span>
                    {fromCurrentUser && (
                      <span className="ml-2">
                        {message.read ? (
                          <span title="Read">✓✓</span>
                        ) : (
                          <span title="Sent">✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-full bg-white dark:bg-slate-800 transition-colors duration-300 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-slate-700"
      >
        <div className="flex items-center">
          <div className="relative flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
            >
              {chat.avatar ? (
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-bold">
                  {chat.name?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
            </motion.div>
            {chat.isOnline && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
              />
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="ml-3 min-w-0"
          >
            <Label className="font-medium text-gray-900 dark:text-white truncate">
              {chat.name}
            </Label>
            <Label className="text-xs text-gray-500 dark:text-gray-400">
              {chat.isOnline ? "Online" : "Last seen recently"}
            </Label>
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 dark:text-gray-300"
          >
            {showSearch ? <FaTimes /> : <FaSearch />}
          </Button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-200 dark:border-slate-700"
          >
            <div className="p-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search in conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="p-2 bg-gray-50 dark:bg-slate-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Found {searchResults.length} results
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderMessages()}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-slate-700 p-3">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 resize-none min-h-[40px] max-h-[120px] p-2 bg-gray-100 dark:bg-slate-700 border-0 focus:ring-1 focus:ring-indigo-600"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-400"
          >
            Send
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox;
