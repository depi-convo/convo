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
  ]);

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

  // Simulate other person typing
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of typing
        setIsOtherTyping(true);
        setTimeout(() => {
          setIsOtherTyping(false);
        }, 2000);
      }
    }, 5000);

    return () => clearInterval(typingInterval);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = messages.filter(message =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      
      // Highlight the first result
      if (results.length > 0) {
        setHighlightedMessage(results[0]);
        // Scroll to the highlighted message
        const messageElement = document.getElementById(`message-${results[0].timestamp}`);
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } else {
      setSearchResults([]);
      setHighlightedMessage(null);
    }
  }, [searchQuery, messages]);

  // Play notification sound for new messages
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "other") {
      notificationSound.current.play().catch(error => console.log("Error playing sound:", error));
    }
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (input.trim() !== "" || file || audioBlob) {
      const newMessage = {
        text: input.trim(),
        sender: "user",
        timestamp: new Date(),
        read: false,
        file: file
          ? URL.createObjectURL(file)
          : audioBlob
          ? URL.createObjectURL(audioBlob)
          : null,
        fileName: file ? file.name : audioBlob ? "Voice Message" : null,
        fileType: file ? file.type : audioBlob ? "audio" : null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setFile(null);
      setAudioBlob(null);
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

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) => date.toLocaleDateString();

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
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-200"
            />
            {user.isOnline && (
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
              {user.name}
            </Label>
            <Label className="text-xs text-green-500">
              {user.isOnline ? "Online" : "Offline"}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              id={`message-${message.timestamp}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex flex-col",
                message.sender === "user" ? "items-end" : "items-start"
              )}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-3 rounded-2xl max-w-[75%] md:max-w-[60%] break-words break-all whitespace-pre-wrap text-white shadow-sm transition-all duration-300",
                  message.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white"
                    : "bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-900 dark:text-white",
                  highlightedMessage === message && "ring-2 ring-indigo-500 ring-offset-2"
                )}
              >
                {message.file && message.fileType === "audio" ? (
                  <audio controls src={message.file} className="mb-2 w-40 sm:w-48" />
                ) : (
                  message.file && (
                    <>
                      {message.fileName &&
                      (message.fileName.endsWith(".png") ||
                        message.fileName.endsWith(".jpg") ||
                        message.fileName.endsWith(".jpeg") ||
                        message.fileName.endsWith(".gif")) ? (
                        <img
                          src={message.file}
                          alt="Uploaded file"
                          className="rounded-lg mb-2 w-40 h-auto"
                        />
                      ) : (
                        <div className="flex flex-col">
                          <a
                            href={message.file}
                            download={message.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-200 underline break-all"
                          >
                            📄 {message.fileName}
                          </a>
                        </div>
                      )}
                    </>
                  )
                )}

                {message.text}
                <div className="text-xs text-gray-400 mt-1 flex items-center justify-end">
                  {formatTime(message.timestamp)}
                </div>
              </motion.div>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(message.timestamp)}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isOtherTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm"
            >
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-2 bg-indigo-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 bg-indigo-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-indigo-500 rounded-full"
                />
              </div>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {user.name} is typing...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-4 border-t flex flex-row space-x-2 bg-white dark:bg-slate-800 mt-auto justify-center items-center relative"
      >
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-1/12">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
          </div>
        )}

        {/* Emoji Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-2xl"
        >
          <FaSmile />
        </Button>

        {/* File Upload */}
        <div className="relative">
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf,application/msword,application/zip"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="text-2xl"
          >
            <FaPaperclip />
          </Button>
        </div>

        {/* مكان المعاينة preview فوق التيكست ايريا */}
        <div className="flex flex-col flex-1 space-y-2">
          {/* File preview */}
          {file && (
            <div className="flex items-center justify-between bg-indigo-100 dark:bg-slate-700 p-2 rounded-lg">
              <div className="flex-1 break-all text-xs text-gray-800 dark:text-white">
                📎 {file.name}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFile(null)}
                className="text-red-500 ml-2"
              >
                ✖
              </Button>
            </div>
          )}

          {/* Audio preview */}
          {audioBlob && (
            <div className=" w-full flex items-center justify-between bg-indigo-100 dark:bg-slate-700 p-2 rounded-lg max-w-[200px]">
              <audio controls src={URL.createObjectURL(audioBlob)} className="w-full"  style={{ height: "40px" }}/>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAudioBlob(null)}
                className="text-red-500 ml-2"
              >
                ✖
              </Button>
            </div>
          )}

          {/* Textarea */}
          <Textarea
            className="resize-none flex-1 max-h-32 overflow-y-auto break-all"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>

        {/* Voice Record Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          className={`text-2xl ${isRecording ? "text-red-500" : ""}`}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </Button>

        {/* Send Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="send"
            onClick={handleSendMessage}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <span>Send</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </motion.svg>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Chatbox;
