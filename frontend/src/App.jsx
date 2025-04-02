import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import Navigation from "@/components/Navbar";
import Chatbox from "./components/Chatbox";

const myContact = {
  name: "Alice Smith",
  profilePic: "URL_TO_PROFILE_PICTURE", // Replace with a real URL
  isActive: true,
};

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navigation />
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <Chatbox contact={myContact} />
            <Routes>
              <Route path="/" />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
