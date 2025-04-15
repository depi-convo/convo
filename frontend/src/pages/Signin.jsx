import { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AnimatedBackground = ({ darkMode }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shapes = [];
  const shapeCount = 15;

  for (let i = 0; i < shapeCount; i++) {
    const size = Math.random() * 100 + 20;
    shapes.push({
      id: i,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: size,
      animationDuration: Math.random() * 20 + 10,
      animationDelay: Math.random() * 5,
      type: Math.random() > 0.5 ? "circle" : "square",
    });
  }

  const animationKeyframes = `
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(100px, -50px) rotate(90deg); }
      50% { transform: translate(50px, 100px) rotate(180deg); }
      75% { transform: translate(-50px, 50px) rotate(270deg); }
      100% { transform: translate(0, 0) rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.6; }
    }
  `;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50"
        } opacity-40`}
        style={{
          animation: "pulse 4s infinite ease-in-out",
        }}
      />
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`
            absolute opacity-10
            ${darkMode ? "bg-blue-300" : "bg-blue-600"}
            ${shape.type === "circle" ? "rounded-full" : "rounded-md"}
          `}
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            animation: `float ${shape.animationDuration}s infinite ease-in-out`,
            animationDelay: `${shape.animationDelay}s`,
          }}
        />
      ))}
      <style jsx>{animationKeyframes}</style>
    </div>
  );
};

const Signin = ({ onLogin, darkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("All fields required");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const userData = {
        id: 1,
        name: "Esraa Karam",
        email: email,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-400 overflow-hidden"
    >
      <AnimatedBackground darkMode={darkMode} />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex-1 flex items-center justify-center px-4 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md p-8 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-lg backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className={`w-full py-2 px-4 bg-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Loading</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-700 dark:text-blue-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signin;
