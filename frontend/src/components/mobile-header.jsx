
import { FaBars, FaMoon, FaSun } from "react-icons/fa"

const MobileHeader = ({ toggleMenu, darkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center">
        <button onClick={toggleMenu} className="p-2 rounded-full">
          <FaBars className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-xl mr-2">
          C
        </div>
        <h1 className="text-xl font-bold text-black dark:text-white">Convo</h1>
      </div>

      <button
        onClick={toggleDarkMode}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-slate-700 p-1"
      >
        <span
          className={`absolute ${darkMode ? "translate-x-5" : "translate-x-0"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
        {darkMode ? (
          <FaSun className="ml-auto h-3 w-3 text-yellow-400" />
        ) : (
          <FaMoon className="h-3 w-3 text-slate-700" />
        )}
      </button>
    </header>
  )
}

export default MobileHeader

