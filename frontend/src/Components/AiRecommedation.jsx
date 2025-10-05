import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AiRecommendation({ eventsData }) {
  const [skill, setSkill] = useState("");
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    // Initial random recommendation
    const shuffled = eventsData.sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 5));
  }, [eventsData]);

  const handleRecommend = () => {
    const filtered = eventsData.filter((event) =>
      event.tags.some((tag) => tag.toLowerCase() === skill.toLowerCase())
    );
    setRecommended(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className="p-6 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-6xl mx-auto my-12">
      {/* Background floating shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        🤖 SmartSkill Events
      </h2>

      {/* Skill Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center flex-1 bg-gray-800 rounded-xl px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Enter your skill (e.g., Python)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-400"
          />
        </div>
        <motion.button
          onClick={handleRecommend}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(168,85,247,0.6)" }}
          className="px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition font-semibold text-white"
        >
          Recommend
        </motion.button>
      </div>

      {/* Recommended Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommended.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center mt-4 text-lg">
            No events recommended yet. Try another skill!
          </p>
        ) : (
          recommended.map((event, i) => (
            <motion.a
              key={i}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(168,85,247,0.5)" }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-5 flex flex-col hover:bg-gray-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={event.logo}
                  alt={event.title}
                  className="w-12 h-12 object-contain rounded-md bg-white p-1"
                />
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
              </div>
              <p className="text-gray-300 flex-1 mb-3">{event.description}</p>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{event.category}</span>
                <span>{event.date}</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  );
}
