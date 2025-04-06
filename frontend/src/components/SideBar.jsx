import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="bg-white shadow-lg w-64 h-screen p-4">
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors block p-2 rounded-md"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className="text-gray-700 hover:text-blue-600 transition-colors block p-2 rounded-md"
          >
            Chat
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors block p-2 rounded-md"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-gray-700 hover:text-blue-600 transition-colors block p-2 rounded-md"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className="text-gray-700 hover:text-blue-600 transition-colors block p-2 rounded-md"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Button asChild className="w-full">
            <Link to="/signup" className="w-full text-center">
              Sign Up
            </Link>
          </Button>
        </li>
      </ul>
    </aside>
  );
}
