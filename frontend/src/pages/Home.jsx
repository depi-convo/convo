"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import ChatList from "../components/chat-list"
import Chatbox from "../components/Chatbox"
import Welcome from "../components/welcome-screen"
import { FaBars, FaMoon, FaSun } from "react-icons/fa"
import MobileNavbar from "../components/mobile-navbar"

const Home = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState("home")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Esraa karam",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Hello",
      time: "Today, 11:11pm",
      unread: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Hello",
          sender: "them",
          time: "11:11 PM",
        },
      ],
      isTyping: false,
    },
    {
      id: 2,
      name: "Esraa karam",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Hello there",
      time: "Today, 11:11pm",
      unread: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Hello there",
          sender: "them",
          time: "11:11 PM",
        },
      ],
      isTyping: false,
    },
    {
      id: 3,
      name: "Esraa karam",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Typing...",
      time: "Today, 11:11pm",
      unread: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Hello",
          sender: "them",
          time: "11:11 PM",
        },
      ],
      isTyping: true,
    },
  ])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleChatSelect = (chat) => {
    // Mark unread messages as read
    const updatedChats = chats.map((c) => {
      if (c.id === chat.id) {
        return { ...c, unread: 0 }
      }
      return c
    })

    setChats(updatedChats)
    setSelectedChat(chat)
  }

  const handleSendMessage = (chatId, message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: "11:12 PM",
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        // Add message
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          time: "Just now",
          isTyping: true,
        }

        // Simulate response after 2 seconds
        setTimeout(() => {
          setChats((prevChats) => {
            return prevChats.map((c) => {
              if (c.id === chatId) {
                const responseMessage = {
                  id: Date.now(),
                  text: "How are you doing today?",
                  sender: "them",
                  time: "11:12 PM",
                }

                return {
                  ...c,
                  messages: [...c.messages, responseMessage],
                  lastMessage: responseMessage.text,
                  time: "Just now",
                  isTyping: false,
                }
              }
              return c
            })
          })
        }, 1000)

        return updatedChat
      }
      return chat
    })

    setChats(updatedChats)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (page) => {
    setActivePage(page)
    setIsMobileMenuOpen(false)

    switch (page) {
      case "home":
        navigate("/")
        break
      case "profile":
        navigate("/profile")
        break
      case "groups":
        navigate("/groups")
        break
      default:
        navigate("/")
    }
  }

  return (
    <div className="flex flex-col  bg-gray-50 dark:bg-slate-900 transition-colors duration-300 h-screen w-screen overflow-hidden">
      {/* Header - full width */}
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in   ">
        <div className="flex justify-between items-center pr-4 pl-4 pt-2 pb-2 ">
          {isMobile ? (
            <button onClick={toggleMobileMenu} className="p-2 rounded-full mr-2">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          ) : null}

          <div className="flex items-center">
          <img src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000" width={"50px"}  height={"10px"} alt="logo" ></img>

            <h1 className="text-2xl font-bold ml-2 text-black dark:text-gray-50 font-englebert">Convo</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-full  transition-all duration-300 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: darkMode ? "#0f172a" : "#f0f9ff",
              width: "48px",
              height: "48px",
              transform: darkMode ? "rotate(180deg)" : "rotate(0deg)",
              transition: "background-color 0.5s, transform 0.5s",
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: darkMode ? 0 : 1,
                transition: "opacity 0.5s",
                transform: darkMode ? "scale(0.5)" : "scale(1)",
              }}
            >
              <div className="relative">
                <FaMoon style={{ color: "#334155", fontSize: "20px" }} />
                <div
                  className="absolute top-0 right-0 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#94a3b8",
                    transform: "translate(25%, -25%)",
                  }}
                />
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: darkMode ? 1 : 0,
                transition: "opacity 0.5s",
                transform: darkMode ? "scale(1)" : "scale(0.5)",
              }}
            >
              <div className="relative">
                <FaSun style={{ color: "#fbbf24", fontSize: "22px" }} />
                <div
                  className="absolute top-0 left-0 w-1 h-1 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "#fef3c7",
                    boxShadow: "0 0 8px 2px rgba(251, 191, 36, 0.6)",
                  }}
                />
              </div>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-br"
              style={{
                opacity: 0.1,
                background: darkMode
                  ? "radial-gradient(circle at 70% 70%, #60a5fa, transparent 50%)"
                  : "radial-gradient(circle at 30% 30%, #fbbf24, transparent 50%)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-md z-10 animate-slide-in-down">
          <MobileNavbar
            activePage={activePage}
            setActivePage={handleNavigation}
            user={user}
            onLogout={onLogout}
          ></MobileNavbar>
        </div>
      )}


      {/* Main content area with sidebar and chat */}
      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar - fixed width */}
        <div className="hidden md:block md: w-20 flex-shrink-0  bg-indigo-800 rounded-4xl dark:bg-indigo-800 m-1 border-r border-gray-200 dark:border-slate-700">
          <Sidebar activePage={activePage} setActivePage={handleNavigation} user={user} onLogout={onLogout} />
        </div>

        <div className="flex flex-1 ">
          {/* Chat List - increased width */}
          <div
            className={`${selectedChat && isMobile ? "hidden" : "block"} w-full md:w-96 flex-shrink-0 border-r border-gray-200 dark:border-slate-700 h-full overflow-hidden`}
          >
            <ChatList chats={chats} onChatSelect={handleChatSelect} selectedChat={selectedChat} />
          </div>

          {/* Chat or Welcome Screen - reduced width */}
          <div className={`${!selectedChat && isMobile ? "hidden" : "block"} flex-1 w-full h-full overflow-hidden`}>
            {selectedChat ? (
              <Chatbox chat={selectedChat} onSendMessage={handleSendMessage} user={user} isMobile={isMobile} />
            ) : (
              <Welcome user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
