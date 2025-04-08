

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa"

const Signup = ({ onLogin, darkMode, toggleDarkMode }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError("جميع الحقول مطلوبة")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: name,
        email: email,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      }

      onLogin(userData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white dark:bg-slate-800 shadow-md z-10 animate-fade-in">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <h1 className="text-2xl font-bold ml-2 text-blue-600 dark:text-blue-400">Convo</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-700" />}
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 mt-16 animate-slide-in-up">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">إنشاء حساب جديد</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الاسم
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="أدخل اسمك"
                dir="rtl"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  placeholder="أدخل كلمة المرور"
                  dir="rtl"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  placeholder="أعد إدخال كلمة المرور"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="pt-2">
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
                    <span className="ml-2">جاري إنشاء الحساب...</span>
                  </div>
                ) : (
                  "إنشاء حساب"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{" "}
              <Link to="/signin" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

