import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MobileNavbar from "../components/mobile-navbar";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";

const Profile = ({ user: propUser, onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  // Initialize user state with prop or localStorage
  const [user, setUser] = useState(() => {
    return propUser || JSON.parse(localStorage.getItem("user")) || {};
  });

  const [imageSrc, setImageSrc] = useState(user?.profileImage || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  // Update user state when prop changes
  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      setImageSrc(propUser.profileImage || null);
    }
  }, [propUser]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    setTimeout(() => setIsLoading(false), 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  
  const handleDeletePhoto = () => {
    // Use a more subtle confirmation approach
    if (window.confirm("Are you sure you want to delete your profile photo?")) {
      const updated = { ...user, profileImage: null };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setImageSrc(null);
    }
  };

  const handleChangePhoto = () => {
    // Create a hidden file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none"; // Hide the input element
    
    // Add the input to the document body
    document.body.appendChild(input);
    
    // Trigger the file selection dialog
    input.click();
    
    // Handle the file selection
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const updated = { ...user, profileImage: e.target.result };
          localStorage.setItem("user", JSON.stringify(updated));
          setUser(updated);
          setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      
      // Remove the input element from the document
      document.body.removeChild(input);
    };
  };

  const handleClose = () => {
    navigate("/home");
  };

  const handleEditClick = () => {
    // Log the user data to debug
    console.log("User data being passed to edit:", user);
    
    // Make sure we're passing the complete user object
    navigate("/edit-profile", { 
      state: { 
        localUser: {
          ...user,
          email: user.email || "", // Ensure email is included
          username: user.username || "",
          profileImage: user.profileImage || null
        } 
      } 
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);

    switch (page) {
      case "home":
        navigate("/home");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "groups":
        navigate("/groups");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300 h-screen w-screen overflow-hidden">
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in">
        <div className="flex justify-between items-center pr-4 pl-4 pt-2 pb-2">
          {isMobile ? (
            <button onClick={toggleMobileMenu} className="p-2 rounded-full mr-2">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          ) : null}

          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000"
              width={"50px"}
              height={"10px"}
              alt="logo"
            />

            <h1 className="text-2xl font-bold ml-2 text-black dark:text-gray-50 font-englebert">
              Convo
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
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

      {isMobile && isMobileMenuOpen && (
        <MobileNavbar
          activePage={activePage}
          setActivePage={handleNavigation}
          user={user}
          onLogout={onLogout}
        />
      )}

      <div className="flex flex-1">
        <div className="hidden md:block md:w-20 bg-indigo-800 dark:bg-slate-800 m-1 rounded-4xl">
          <Sidebar
            activePage={activePage}
            setActivePage={handleNavigation}
            user={user}
            onLogout={onLogout}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Profile</h1>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 p-8 rounded-3xl shadow-xl backdrop-blur-md">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center border-4 border-indigo-700 shadow-lg overflow-hidden">
                    {imageSrc ? (
                      <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold">{user?.username?.charAt(0)?.toUpperCase()}</span>
                    )}
                  </div>
                  <button
                    onClick={handleChangePhoto}
                    className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                    title="Change Photo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {user?.username || "Unknown User"}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mb-6">
                  {user?.email || "No email available"}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  {imageSrc && (
                    <button
                      className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
                      onClick={handleDeletePhoto}
                      title="Delete Profile Photo"
                    >
                      Delete Photo
                    </button>
                  )}
                  <button
                    className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
                    onClick={handleEditClick}
                    title="Edit Profile"
                  >
                    Edit Profile
                  </button>
                  <button
                    className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold shadow-md transition-all duration-300 ease-in-out"
                    onClick={handleClose}
                    title="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
