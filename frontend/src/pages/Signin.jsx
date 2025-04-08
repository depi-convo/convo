

import { useState } from "react";
import Header from "../components/header";

//بنستخدم Link علشان ننتقل بين الصفحات بدون ما الصفحة تعمل reload.
import { Link } from "react-router-dom";

//FaEye / FaEyeSlash لعرض أو إخفاء كلمة المرور.
//FaMoon / FaSun لتغيير الـ theme بين الوضع الليلي والوضع العادي.
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";

const Signin = ({ onLogin, darkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // بيمنع الصفحة من إنها تعمل refresh لما الفورم يتبعت
    setError("");
    setIsLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError("All fields required");
      setIsLoading(false);
      return;
    }

    // بنعمل محاكاة لـ API call باستخدام setTimeout.

    // بعد ثانية واحدة:

    // بنجهز بيانات وهمية للمستخدم.

    // بننادي onLogin(userData) علشان نعتبر إنه سجل دخول.

    // بنوقف اللودر.
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
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-400">
      
     <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <div className="flex-1 flex items-center justify-center px-4 mt-16 animate-slide-in-up">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
              email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="enter your email"
      
              /> 
          
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
               password
              </label>
              <div className="relative  ">
              
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  placeholder="enter your pass"
                
                />
                 <button
                  type="button"
                  className="absolute inset-y-0 left-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
               
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">loading</span>
                  </div>
                ) : (
                  " login"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
            Dont have acc{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
