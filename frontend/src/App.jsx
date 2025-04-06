import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import Sidebar from "@/components/SideBar";
import Chatbox from "./components/Chatbox";

const fakeContact = {
  name: "Alice Smith",
  profilePic: "https://i.pravatar.cc/64",
  isActive: true,
};

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50 flex">
        <Sidebar /> {/* Sidebar component */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="/" />
              <Route path="/chat" element={<Chatbox contact={fakeContact} />} />
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
