import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { FaPlus } from "react-icons/fa";

const Groups = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("groups");

  const [channels, setChannels] = useState([
    {
      id: 1,
      name: "Tech Talks",
      description: "Latest updates in technology",
      image: "https://placehold.co/80x80",
      joined: false,
    },
    {
      id: 2,
      name: "Gaming Arena",
      description: "All about games and streams",
      image: "https://placehold.co/80x80",
      joined: true,
    },
    {
      id: 3,
      name: "Fitness Vibes",
      description: "Health, workouts & motivation",
      image: "https://placehold.co/80x80",
      joined: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: "",
    description: "",
    image: "https://placehold.co/80x80",
  });

  const handleJoinLeave = (id) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === id ? { ...channel, joined: !channel.joined } : channel
      )
    );
  };

  const handleChannelClick = (id) => {
    navigate(`/channels/${id}`);
  };

  const handleAddChannel = () => {
    if (!newChannel.name.trim()) return;

    const id = channels.length + 1;
    setChannels([
      ...channels,
      {
        id,
        ...newChannel,
        joined: false,
      },
    ]);
    setNewChannel({ name: "", description: "", image: "https://placehold.co/80x80" });
    setShowForm(false);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="hidden md:block w-20 bg-indigo-900 dark:bg-slate-800 m-1 rounded-2xl">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          user={user}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Channels
            </h1>
            <div className="flex gap-4">
              <button
                onClick={toggleDarkMode}
                className="text-gray-700 dark:text-gray-200 border px-3 py-2 rounded-full"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow"
              >
                <FaPlus /> Create Channel
              </button>
            </div>
          </div>

          {/* Create Channel Form */}
          {showForm && (
            <div className="mb-6 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
              <input
                type="text"
                placeholder="Channel Name"
                className="w-full p-2 border rounded"
                value={newChannel.name}
                onChange={(e) =>
                  setNewChannel({ ...newChannel, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={newChannel.description}
                onChange={(e) =>
                  setNewChannel({ ...newChannel, description: e.target.value })
                }
              />
              <button
                onClick={handleAddChannel}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Channel
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
                onClick={() => handleChannelClick(channel.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={channel.image}
                    alt={channel.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {channel.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {channel.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinLeave(channel.id);
                    }}
                    className={`px-4 py-1 text-sm font-semibold rounded-full shadow transition duration-300 ${
                      channel.joined
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {channel.joined ? "Leave" : "Join"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
