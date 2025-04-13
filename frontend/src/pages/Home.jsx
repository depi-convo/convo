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
    <div className="flex flex-col  bg-gray-50 dark:bg-slate-900 transition-colors duration-300 h-screen w-screen">
      {/* Header - full width */}
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in ">
        <div className="flex justify-between items-center p-4">
          {isMobile ? (
            <button onClick={toggleMobileMenu} className="p-2 rounded-full mr-2">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          ) : null}
          
          <div className="flex items-center">
            <svg
              className="rounded-xl"
              width="40"
              height="40"
              viewBox="0 0 93 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.604126"
                width="92.1108"
                height="92.1108"
                rx="25"
                transform="rotate(0.375795 0.604126 0)"
                fill="black"
              />
              <path
                d="M75.1001 25.9193C74.6504 25.4652 74.1144 25.1064 73.5229 24.8645C72.9313 24.6226 72.2974 24.5024 71.6587 24.5112L71.6323 24.511C67.8717 24.4863 64.8767 21.4119 64.9013 17.6579C64.915 17.032 64.8048 16.4095 64.5771 15.8262C64.3494 15.243 64.0087 14.7106 63.5744 14.2595C63.1402 13.8084 62.6211 13.4477 62.047 13.1979C61.4728 12.9482 60.855 12.8144 60.229 12.8043L22.003 12.5536C21.3774 12.5555 20.7584 12.6809 20.1815 12.9227C19.6046 13.1645 19.0811 13.5178 18.6411 13.9625C18.2011 14.4071 17.8532 14.9342 17.6175 15.5137C17.3817 16.0931 17.2628 16.7134 17.2674 17.3389C17.2427 21.0995 14.1747 24.1209 10.4141 24.0963L10.4141 24.1029C9.78095 24.0864 9.15093 24.1967 8.56105 24.4273C7.97118 24.6579 7.43337 25.004 6.97926 25.4455C6.52515 25.887 6.1639 26.4148 5.91677 26.998C5.66964 27.5811 5.54161 28.2078 5.54022 28.8411L5.46003 41.0663C5.45398 41.6996 5.57464 42.3277 5.8149 42.9137C6.05517 43.4998 6.41019 44.0318 6.85909 44.4786C7.308 44.9254 7.84171 45.2778 8.42884 45.5154C9.01598 45.7529 9.64468 45.8705 10.278 45.8615C12.0779 45.8733 13.7997 46.5987 15.0654 47.8786C16.3311 49.1585 17.0372 50.8883 17.0289 52.6883L16.9475 65.1048C16.9371 66.6882 18.9315 67.4073 19.9292 66.18L26.8801 57.6089L59.9337 57.8257C60.5592 57.8238 61.1782 57.6983 61.7551 57.4565C62.332 57.2148 62.8555 56.8614 63.2956 56.4168C63.7355 55.9722 64.0834 55.445 64.3192 54.8656C64.5549 54.2861 64.6739 53.6659 64.6693 53.0404L64.6693 53.0338C64.694 49.2732 67.7488 46.245 71.5093 46.2697L71.5159 46.2697C72.1492 46.288 72.78 46.1792 73.3707 45.9498C73.9614 45.7203 74.5001 45.3749 74.9549 44.9338C75.4097 44.4928 75.7715 43.9651 76.0194 43.3819C76.2667 42.7987 76.3948 42.1717 76.3964 41.5381L76.4766 29.3064C76.4846 28.0858 76.0308 26.8623 75.1001 25.9193ZM66.8688 41.601C66.8379 43.3911 66.1026 45.097 64.8222 46.3484C63.5418 47.5998 61.8196 48.296 60.0292 48.2859L21.7307 48.0347C19.9403 48.0213 18.2274 47.3026 16.9636 46.0345C15.6996 44.7664 14.9867 43.051 14.9794 41.2607L15.0613 28.7716C15.0921 26.9815 15.8275 25.2756 17.1079 24.0242C18.3883 22.7728 20.1105 22.0766 21.9009 22.0867L21.901 22.0735L21.934 22.0737L21.9339 22.0803L60.1863 22.3312C63.9205 22.3557 66.929 25.384 66.9442 29.1053L66.8622 41.601L66.8688 41.601Z"
                fill="white"
              />
              <path
                d="M30.4394 27.9554C27.8004 27.9381 25.6554 30.0617 25.6381 32.7008L25.6068 37.4707C25.5787 38.1123 25.6804 38.753 25.9056 39.3545C26.1308 39.9559 26.4749 40.5058 26.9175 40.9712C27.36 41.4366 27.8919 41.8079 28.4813 42.0631C29.0707 42.3182 29.7054 42.4519 30.3476 42.4561C30.9898 42.4603 31.6263 42.335 32.219 42.0876C32.8117 41.8402 33.3483 41.4758 33.797 41.0163C34.2456 40.5568 34.5969 40.0115 34.83 39.413C35.0631 38.8146 35.1731 38.1753 35.1534 37.5334L35.1847 32.7634C35.202 30.1244 33.0784 27.9728 30.4394 27.9554ZM51.5845 28.0941C48.9454 28.0768 46.7938 30.2004 46.7765 32.8394L46.7452 37.6094C46.7369 38.8762 47.2322 40.0945 48.1222 40.9961C49.012 41.8978 50.2237 42.409 51.4905 42.4173C52.7574 42.4256 53.9756 41.9303 54.8773 41.0404C55.7789 40.1505 56.2901 38.9389 56.2984 37.6721L56.3297 32.9021C56.347 30.2631 54.2235 28.1114 51.5845 28.0941Z"
                fill="white"
              />
              <path
                d="M29.7048 78.5689L36.4496 70.2471L69.5031 70.4639C70.1292 70.4629 70.7489 70.3381 71.3266 70.0967C71.9041 69.8553 72.4283 69.5021 72.8693 69.0574C73.3097 68.6127 73.6582 68.0852 73.8943 67.5054C74.131 66.9256 74.2498 66.3048 74.2454 65.6787C74.2633 61.9312 77.3116 58.903 81.0591 58.9144L81.0921 58.9146C81.7253 58.932 82.3561 58.8224 82.9468 58.5922C83.5375 58.362 84.0762 58.0159 84.531 57.5744C84.9859 57.1329 85.3476 56.6047 85.5956 56.0212C85.8428 55.4376 85.971 54.8104 85.9725 54.1765L86.0517 42.103C86.0592 40.955 85.6839 39.831 84.9906 38.9093L83.6627 37.1588L83.5719 51.0136C83.5697 51.6469 83.4409 52.2734 83.1929 52.8562C82.945 53.439 82.5826 53.9663 82.1278 54.4072C81.6736 54.8481 81.1349 55.1935 80.5449 55.4233C79.9549 55.6531 79.3247 55.7625 78.6915 55.7452L78.6651 55.745C76.8632 55.7402 75.1333 56.4503 73.8542 57.7198C72.5758 58.9892 71.8532 60.714 71.8447 62.5158C71.8492 63.1413 71.7303 63.7615 71.4943 64.341C71.2588 64.9204 70.911 65.4476 70.471 65.8922C70.0309 66.3368 69.5075 66.6902 68.9305 66.932C68.3536 67.1737 67.7346 67.2992 67.109 67.3011L34.0555 67.0843L26.7122 76.1411C26.3902 76.5379 26.2391 77.0464 26.292 77.5547C26.345 78.063 26.5977 78.5294 26.9946 78.8513C27.3914 79.1733 27.8999 79.3244 28.4082 79.2716C28.9165 79.2182 29.3829 78.966 29.7048 78.5689Z"
                fill="url(#paint0_linear_8_47)"
              />
              <path
                d="M22.0773 69.6184L29.261 60.7585L62.3145 60.9753C62.9401 60.9734 63.559 60.848 64.136 60.6062C64.7129 60.3644 65.2364 60.0111 65.6764 59.5665C66.1165 59.1218 66.4643 58.5947 66.7 58.0152C66.9357 57.4358 67.0547 56.8155 67.0501 56.19C67.0584 54.39 67.7805 52.6668 69.058 51.3987C70.3354 50.1305 72.0639 49.421 73.8638 49.4258L73.8968 49.426C74.53 49.4443 75.1608 49.3355 75.7515 49.106C76.3422 48.8765 76.8809 48.5311 77.3357 48.0901C77.7906 47.6491 78.1523 47.1213 78.4002 46.5381C78.6475 45.9549 78.7757 45.328 78.7772 44.6944L78.8681 30.8264L80.6015 33.114C81.2982 34.035 81.6708 35.1598 81.6626 36.3143L81.5835 48.3746C81.5813 49.0074 81.4525 49.6333 81.2052 50.2157C80.9573 50.798 80.5962 51.325 80.1421 51.7658C79.6879 52.2066 79.1505 52.5522 78.5612 52.7824C77.9718 53.0126 77.3423 53.1227 76.7097 53.1062L76.6767 53.106C74.8748 53.1029 73.1455 53.8148 71.8684 55.0855C70.5907 56.3561 69.8695 58.0817 69.863 59.8834C69.8676 60.5089 69.7486 61.1293 69.5129 61.7087C69.2771 62.2881 68.9292 62.8152 68.4893 63.2599C68.0492 63.7045 67.5258 64.0578 66.9488 64.2996C66.3719 64.5414 65.7529 64.6669 65.1273 64.6688L32.0738 64.452L25.5819 72.4587C25.3954 72.6888 25.1654 72.8799 24.905 73.0212C24.6447 73.1624 24.359 73.251 24.0645 73.2818C23.7699 73.3126 23.4721 73.2851 23.1881 73.2009C22.9041 73.1167 22.6395 72.9774 22.4094 72.7909C22.1793 72.6043 21.9882 72.3744 21.8469 72.114C21.7057 71.8536 21.6172 71.568 21.5863 71.2735C21.5555 70.9789 21.5829 70.6811 21.6672 70.3971C21.7514 70.1132 21.8908 69.8485 22.0773 69.6184Z"
                fill="url(#paint1_linear_8_47)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_8_47"
                  x1="107.575"
                  y1="7.69814"
                  x2="-3.44223"
                  y2="75.5145"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#46A6F7" />
                  <stop offset="1" stopColor="#8364FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_8_47"
                  x1="21.6963"
                  y1="81.4326"
                  x2="87.2418"
                  y2="34.6883"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF44D3" />
                  <stop offset="1" stopColor="#CF4BFF" />
                </linearGradient>
              </defs>
            </svg>
  
            <h1 className="text-2xl font-bold ml-2 text-black dark:text-gray-50 font-englebert">
              Convo
            </h1>
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
          <MobileNavbar activePage={activePage} setActivePage={handleNavigation} user={user} onLogout={onLogout}></MobileNavbar>
        </div>
      )}

      {/* Main content area with sidebar and chat */}
      <div className="flex flex-1  ">
        {/* Sidebar - fixed width */}
        <div className="hidden md:block md: w-20 flex-shrink-0  bg-indigo-900 rounded-4xl dark:bg-indigo-900 m-1 border-r border-gray-200 dark:border-slate-700">
          <Sidebar activePage={activePage} setActivePage={handleNavigation} user={user} onLogout={onLogout} />
        </div>

        <div className="flex flex-1 ">
          {/* Chat List - increased width */}
          <div
            className={`${selectedChat && isMobile ? "hidden" : "block"} w-full md:w-96 flex-shrink-0 border-r border-gray-200 dark:border-slate-700 `}
          >
            <ChatList chats={chats} onChatSelect={handleChatSelect} selectedChat={selectedChat} />
          </div>

          {/* Chat or Welcome Screen - reduced width */}
          <div className={`${!selectedChat && isMobile ? "hidden" : "block"} flex-1 w-full`}>
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
