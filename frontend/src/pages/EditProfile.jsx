import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import Sidebar from '../components/sidebar';

const EditProfile = ({ onLogout, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if data exist in location or localStorage
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const user = location.state?.localUser || storedUser;

  const [name, setName] = useState(user?.username || '');
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || '');
  const [activePage, setActivePage] = useState("profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    console.log('Toggle Mobile Menu');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfileImage = picture
      ? preview
      : user.profileImage || '';

    const updatedUser = {
      username: name,
      profileImage: updatedProfileImage,
    };

    // Save updated user to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    navigate("/profile", { state: { updatedUser } });
  };

  const handleClose = () => {
    navigate('/profile');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in">
        <div className="flex justify-between items-center px-4 py-2">
          {isMobile && (
            <button onClick={toggleMobileMenu} className="p-2 rounded-full">
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </button>
          )}

          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000"
              width="50"
              height="50"
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
              <FaMoon style={{ color: "#334155", fontSize: "20px" }} />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: darkMode ? 1 : 0,
                transition: "opacity 0.5s",
                transform: darkMode ? "scale(1)" : "scale(0.5)",
              }}
            >
              <FaSun style={{ color: "#fbbf24", fontSize: "22px" }} />
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        <div className="hidden md:block md:w-20 bg-indigo-800 dark:bg-slate-800 m-1 rounded-4xl">
          <Sidebar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
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
                  navigate("/");
              }
            }}
            user={user}
            onLogout={onLogout}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-6">
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {preview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full border-2 border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
  <button
    type="submit"
    className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
  >
    Save Changes
  </button>
  <button
    type="button"
    onClick={handleClose}
    className="px-6 py-2 rounded-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-semibold shadow-md transition-all duration-300 ease-in-out"
  >
    Cancel
  </button>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;