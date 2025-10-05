import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "./friends.png"; // <-- Add your logo image here

export default function AiChatbot({ eventsData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let reply = "Sorry, I couldn't find any events matching that.";
      const foundEvent = eventsData.find(
        (event) =>
          event.title.toLowerCase().includes(input.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(input.toLowerCase()))
      );
      if (foundEvent) {
        reply = `I found an event: ${foundEvent.title} - ${foundEvent.link}`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <button
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition mb-2"
        onClick={() => setOpen(!open)}
      >
        <img src={chatbotIcon} alt="AI Logo" className="w-6 h-6" />
        {open ? "Close AI Assistant" : "AI Assistant"}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-80 max-h-[400px] bg-gray-900 rounded-xl shadow-xl flex flex-col"
        >
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-xl max-w-[70%] break-words ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-glow"
                    }`}
                  >
                    {msg.text}
                  </span>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300 italic"
                >
                  AI is typing...
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </AnimatePresence>
          </div>

          {/* Input Box */}
          <div className="flex p-2 border-t border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about events..."
              className="flex-1 px-3 py-2 rounded-xl bg-gray-800 text-white focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
