import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Groups from "./pages/groups";
import "./index.css";
import EditProfile from "./pages/EditProfile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user)); // get user data from localstorage change it to object and keep it in current user
      setIsAuthenticated(true);
    }

    // Check dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // This function toggles the dark mode on and off.
  // It updates the 'darkMode' state by flipping its current value,
  // saves the new preference in localStorage for persistence across sessions,
  // and adds or removes the 'dark' class on the <html> element to enable or disable Tailwind CSS dark styling.
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // When the user logs in, their data is saved and their status is updated.
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  // same for logout
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div
        className={`h-screen w-screen ${
          darkMode ? "dark" : ""
        }`}
      >
        <Routes>
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Signin
                  onLogin={handleLogin}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Signup
                  onLogin={handleLogin}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home
                  user={currentUser}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : (
                <Navigate to="/signin" /> // هيوديه للساين ان
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile
                  user={currentUser}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          
          <Route
            path="/groups"
            element={
              isAuthenticated ? (
                <Groups
                  user={currentUser}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route
            path="/edit-profile"
            element={
              isAuthenticated ? (
                <EditProfile
                  user={currentUser}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
       
           <Route path="/edit-profile" element={<EditProfile />} />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/signin"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

