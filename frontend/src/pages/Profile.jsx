import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MobileNavbar from "../components/mobile-navbar";

const Profile = ({ onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const updatedUser = location.state?.updatedUser || storedUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(updatedUser?.profileImage || null);

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
    if (window.confirm('Are you sure you want to delete your profile photo?')) {
      setImageSrc(null);
      // TODO: connect API to update user profile
    }
  };

  const handleChangePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleClose = () => {
    navigate("/home");
  };

  const handleEditClick = () => {
    navigate("/edit-profile", { state: { localUser: updatedUser } });
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      
      <Header
        isMobile={isMobile}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleMobileMenu={toggleMobileMenu}
      />

      {isMobile && isMobileMenuOpen && (
        <MobileNavbar
          activePage={activePage}
          setActivePage={handleNavigation}
          user={updatedUser}
          onLogout={onLogout}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block md:w-20 bg-indigo-800 dark:bg-slate-800 m-1 rounded-4xl">
          <Sidebar
            activePage={activePage}
            setActivePage={handleNavigation}
            user={updatedUser}
            onLogout={onLogout}
          />
        </div>

        {/* Main Content */}
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
        <span className="text-4xl font-bold">{updatedUser?.username?.charAt(0)?.toUpperCase()}</span>
      )}
    </div>
    <button
      onClick={handleChangePhoto}
      className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  </div>

  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
    {updatedUser?.username || "Unknown User"}
  </h2>
  <p className="text-gray-500 dark:text-gray-300 mb-6">
    {updatedUser?.email || "No email available"}
  </p>

  <div className="flex justify-center gap-4 flex-wrap">
    <button
      className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
      onClick={handleDeletePhoto}
    >
      Delete Photo
    </button>
    <button
      className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
      onClick={handleEditClick}
    >
      Edit Profile
    </button>
    <button
      className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold shadow-md transition-all duration-300 ease-in-out"
      onClick={handleClose}
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
