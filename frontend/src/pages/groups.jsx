import { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { FaPlus } from "react-icons/fa";
import MobileNavbar from "../components/mobile-navbar"
import { FaBars, FaMoon, FaSun } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion";

const Groups = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("groups");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: "Tech Talks",
      description: "Latest updates in technology",
      image: "https://placehold.co/80x80",
      joined: false,
    },
    {
      id: 2,
      name: "Gaming Arena",
      description: "All about games and streams",
      image: "https://placehold.co/80x80",
      joined: true,
    },
    {
      id: 3,
      name: "Fitness Vibes",
      description: "Health, workouts & motivation",
      image: "https://placehold.co/80x80",
      joined: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: "",
    description: "",
    image: "https://placehold.co/80x80",
  });

  const handleJoinLeave = (id) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === id ? { ...channel, joined: !channel.joined } : channel
      )
    );
  };

  const handleChannelClick = (id) => {
    navigate(`/channels/${id}`);
  };

 
   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth < 768)
     }
 
     window.addEventListener("resize", handleResize)
     return () => window.removeEventListener("resize", handleResize)
   }, [])
   const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

 
  const handleNavigation = (page) => {
    setActivePage(page)
    setIsMobileMenuOpen(false)

    switch (page) {
      case "home":
        navigate("/home")
        break
      case "profile":
        navigate("/profile")
        break
      case "groups":
        navigate("/")
        break
      default:
        navigate("/")
    }
  }

  const handleAddChannel = () => {
    if (!newChannel.name.trim()) return;

    const id = channels.length + 1;
    setChannels([
      ...channels,
      {
        id,
        ...newChannel,
        joined: false,
      },
    ]);
    setNewChannel({ name: "", description: "", image: "https://placehold.co/80x80" });
    setShowForm(false);
  };
  

  return (
    <div className="flex flex-col  bg-gray-50 dark:bg-slate-900 transition-colors duration-300 h-screen w-screen">
     <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 shadow-md z-10"
      >
        <div className="flex justify-between items-center  pr-4 pl-4 pt-2 pb-2">
          {isMobile ? (
            <button onClick={toggleMobileMenu} className="p-2 rounded-full mr-2">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          ) : null}
          
          <div className="flex items-center">
          <img src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000" width={"50px"}  height={"10px"} alt="logo" ></img>
 
  
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
      </motion.header>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-md z-10"
          >
            <MobileNavbar activePage={activePage} setActivePage={handleNavigation} user={user} onLogout={onLogout}></MobileNavbar>
          </motion.div>
        )}
      </AnimatePresence>
     
      {/* Main Content */}

      <div className="flex flex-1  ">
        {/* Sidebar - fixed width */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block md: w-20 flex-shrink-0  bg-indigo-800 rounded-2xl dark:bg-indigo-800 m-1 border-r border-gray-200 dark:border-slate-700"
        >
          <Sidebar activePage={activePage} setActivePage={handleNavigation} user={user} onLogout={onLogout} />
        </motion.div>



        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Channels
            </h1>
            <div className="flex gap-4">
             
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-indigo-700  hover:bg-indigo-800  text-white font-semibold px-4 py-2 rounded-full shadow"
              >
                <FaPlus /> Create Channel
              </motion.button>
            </div>
          </motion.div>

          {/* Create Channel Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Channel Name"
                  className="w-full p-2 border rounded"
                  value={newChannel.name}
                  onChange={(e) =>
                    setNewChannel({ ...newChannel, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  value={newChannel.description}
                  onChange={(e) =>
                    setNewChannel({ ...newChannel, description: e.target.value })
                  }
                />
                <button
                  onClick={handleAddChannel}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Channel
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {channels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
                onClick={() => handleChannelClick(channel.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={channel.image}
                    alt={channel.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {channel.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {channel.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinLeave(channel.id);
                    }}
                    className={`px-4 py-1 text-sm font-semibold rounded-full shadow transition duration-300 ${
                      channel.joined
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {channel.joined ? "Leave" : "Join"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Groups;