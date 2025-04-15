import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaHome,
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaKey,
  FaBell,
} from "react-icons/fa";
import MobileNavbar from "../components/mobile-navbar";

const Profile = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("profile");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [imageSrc, setImageSrc] = useState(
    "https://randomuser.me/api/portraits/men/44.jpg",
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeletePhoto = () => {
    setImageSrc("");
  };

  const handleChangePhoto = () => {
    const newImageSrc = prompt("Enter new image URL:");
    if (newImageSrc) {
      setImageSrc(newImageSrc);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);

    switch (page) {
      case "home":
        navigate("home");
        break;
      case "profile":
        navigate("/");
        break;
      case "groups":
        navigate("/groups");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Fixed Header for all devices */}
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in ">
        <div className="flex justify-between items-center  pr-4 pl-4 pt-2 pb-2">
          {isMobile ? (
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full mr-2"
            >
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          ) : null}
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000"
              width={"50px"}
              height={"10px"}
              alt="logo"
            ></img>

            <h1 className="text-2xl font-bold ml-2 text-black dark:text-gray-50 font-englebert">
              Convo
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg"
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
          />
        </div>
      )}

      <div className="flex flex-1 ">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md: w-20 flex-shrink-0  bg-indigo-800 rounded-4xl dark:bg-indigo-800 m-1 border-r border-gray-200 dark:border-slate-700">
          <Sidebar
            activePage={activePage}
            setActivePage={handleNavigation}
            user={user}
            onLogout={onLogout}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {" "}
              Profile{" "}
            </h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 flex items-center justify-center bg-indigo-100 text-indigo-800 text-4xl font-bold border-4 border-indigo-700 shadow-lg overflow-hidden">
                {/* صورة المستخدم */}
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>No image</span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {user?.username}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                {user?.email || "example@email.com"}
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={handleDeletePhoto}
                >
                  Delete Photo
                </button>
                <button
                  className="px-4 py-2 bg-indigo-700  text-white rounded hover:bg-indigo-800 transition"
                  onClick={handleEditClick}
                >
                  EditProfile
                </button>

                <button
                  className="px-4 py-2 bg-indigo-700 - text-white rounded hover:bg-indigo-800 transition"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
