
import { useNavigate } from "react-router-dom"
import { FaHome, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa"

const Sidebar = ({ activePage, setActivePage, user, onLogout }) => {
  const navigate = useNavigate()

  const handleNavigation = (page) => {
    setActivePage(page)

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
    <div className="flex flex-col items-center justify-center w-20  mt-5  gap-48   dark:bg-indigo-900 rounded-2xl">

      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-8 flex-1 mt-8">
        <SidebarIcon
          icon={<FaHome size="20" />}
          label="Home"
          active={activePage === "home"}
          onClick={() => handleNavigation("home")}
        />
        <SidebarIcon
          icon={<FaUser size="20" />}
          label="Profile"
          active={activePage === "profile"}
          onClick={() => handleNavigation("profile")}
        />
        <SidebarIcon
          icon={<FaUsers size="20" />}
          label="Groups"
          active={activePage === "groups"}
          onClick={() => handleNavigation("groups")}
        />
      </nav>

      {/* Logout */}
      <div className="mt-auto mb-8">
        <SidebarIcon
          icon={<FaSignOutAlt size="20" />}
          label="Logout"
          active={false}
          onClick={onLogout}
          className="text-white"
        />
      </div>
    </div>
  )
}

const SidebarIcon = ({ icon, label, active, onClick, className = "" }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`relative flex items-center justify-center h-12 w-12 rounded-full text-white hover:bg-blue-400 transition-all duration-200 ${active ? "bg-blue-400" : ""} ${className}`}
        onClick={onClick}
      >
        {icon}
      </button>
      <span className="text-xs text-white mt-1">{label}</span>
    </div>
  )
}

export default Sidebar

