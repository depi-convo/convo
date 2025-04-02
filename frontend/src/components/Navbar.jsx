import { Link, Links } from "react-router";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <ul className="flex p-4 gap-6 items-center justify-center">
        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Chat
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
