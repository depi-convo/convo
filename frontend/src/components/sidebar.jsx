import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const iconMap = {
  Home: <FaHome size="20" />,
  Profile: <FaUser size="20" />,
  Groups: <FaUsers size="20" />,
};

const links = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Groups", path: "/groups" },
];

const Sidebar = ({ activePage, setActivePage, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (page, path) => {
    setActivePage(page);
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-between w-20 py-8 dark:bg-indigo-800 rounded-2xl h-full">
      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-8">
        {links.map((link) => (
          <SidebarIcon
            key={link.name}
            icon={iconMap[link.name]}
            label={link.name}
            active={activePage.toLowerCase() === link.name.toLowerCase()}
            onClick={() => handleNavigation(link.name.toLowerCase(), link.path)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <SidebarIcon
          icon={<FaSignOutAlt size="20" />}
          label="Logout"
          active={false}
          onClick={onLogout}
          className="text-white"
        />
      </div>
    </div>
  );
};

const SidebarIcon = ({ icon, label, active, onClick, className = "" }) => {
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full text-white hover:bg-blue-400 transition-all duration-200 ${
          active ? "bg-blue-400" : ""
        } ${className}`}
        onClick={onClick}
      >
        {icon}
      </Button>
      <span className="text-xs text-white mt-1">{label}</span>
    </div>
  );
};

export default Sidebar;
