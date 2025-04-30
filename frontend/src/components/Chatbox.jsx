"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FaPaperclip, FaSmile, FaMicrophone, FaStop } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react"; // ايموجي بيكر

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
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col",
              message.sender === "user" ? "items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-2xl max-w-[75%] md:max-w-[60%] break-words break-all whitespace-pre-wrap text-white shadow-sm transition-all duration-300",
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
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
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(message.timestamp)}
            </p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t flex flex-row space-x-2 bg-white dark:bg-slate-800 mt-auto justify-center items-center relative">
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
        <Button
          variant="send"
          onClick={handleSendMessage}
          className="px-4 bg-indigo-600"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
