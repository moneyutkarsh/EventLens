import { FaRobot, FaComments } from "react-icons/fa";
import Navbar from "../Components/NavBar";

export default function About() {
  return (
    <div >
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            <br></br>
          About <span className="text-indigo-400">EventHub</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
          EventHub is your go-to platform for discovering hackathons, workshops,
          and conferences worldwide. Our mission is to connect developers, tech
          enthusiasts, and innovators with the best opportunities to grow and
          showcase their skills.
        </p>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* AI Recommendation */}
        <div className="p-6 bg-white/5 rounded-2xl shadow-lg text-center hover:bg-white/10 transition">
          <FaRobot className="text-indigo-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Personalized event suggestions powered by AI. We help you find the
            hackathons and workshops most relevant to your skills and interests.
          </p>
        </div>

        {/* AI Chatbot */}
        <div className="p-6 bg-white/5 rounded-2xl shadow-lg text-center hover:bg-white/10 transition">
          <FaComments className="text-indigo-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">AI Chatbot</h3>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Your personal assistant for navigating EventHub. Ask questions,
            explore events, and get quick help—all powered by an AI chatbot.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-white">Why EventHub?</h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          We believe in making tech opportunities accessible to everyone. With
          EventHub, you don’t just attend events—you become part of a thriving
          global developer community. 🚀
        </p>
      </div>
    </div>
  );
}
