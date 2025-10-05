import React, { useState, useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedEvents } from "../pages/SavedEventsContext";

const EventsCard = ({ eventsData = [] }) => {
  const { saved, setSaved } = useSavedEvents();

  const BATCH_SIZE = 6;
  const [visibleEvents, setVisibleEvents] = useState(eventsData.slice(0, BATCH_SIZE));
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleEvents, loadingMore]);

  const loadMore = () => {
    if (visibleEvents.length >= eventsData.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextEvents = eventsData.slice(
        visibleEvents.length,
        visibleEvents.length + BATCH_SIZE
      );
      setVisibleEvents((prev) => [...prev, ...nextEvents]);
      setLoadingMore(false);
    }, 600);
  };

  const toggleSave = (event) => {
    const isSaved = saved.some((e) => e.title === event.title);
    const updatedEvents = isSaved
      ? saved.filter((e) => e.title !== event.title)
      : [...saved, event];
    setSaved(updatedEvents);
  };

  if (!Array.isArray(eventsData) || eventsData.length === 0)
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        😔 No events found.
      </p>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {visibleEvents.map((event, index) => {
          const isSaved = saved.some((e) => e.title === event.title);

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                glareEnable
                glareMaxOpacity={0.15}
                scale={1.02}
                className={`bg-gradient-to-b from-gray-900/80 to-gray-800/80 text-white rounded-2xl shadow-xl p-6 flex flex-col h-full relative hover:shadow-2xl transition-shadow duration-300
                  ${event.live ? "border-2 border-blue-500 animate-pulse" : "border border-gray-700"}`}
                
              >
                {/* LIVE Badge */}
{event.live && (
  <div className="absolute top-3 right-3 flex items-center justify-center z-10">
    {/* Glowing Ring */}
    <span className="absolute inline-flex h-8 w-16 rounded-full bg-red-500 opacity-75 animate-ping"></span>

    {/* Main Badge */}
    <span className="relative bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
      LIVE
    </span>
  </div>
)}


                {/* Main Content */}
                <div className="flex flex-col items-center">
                  <div className="flex justify-center">
                    <img
                      src={event.logo}
                      alt={event.title}
                      className="w-16 h-16 object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="text-center mt-3">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </div>

                  <p className="text-sm text-gray-300 mt-4 text-center line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex justify-center gap-4 mt-4">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 12px rgba(34,197,94,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className="flex items-center gap-1 bg-green-700/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                    >
                      🏆 {event.prizePool || "N/A"}
                    </motion.div>

                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 12px rgba(59,130,246,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className="flex items-center gap-1 bg-blue-700/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                    >
                      👥 {event.participants || "N/A"}
                    </motion.div>
                  </div>

                  {event.tags && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {event.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-sm font-medium rounded-lg transition"
                  >
                    Visit Site
                  </a>

                  <button
                    onClick={() => toggleSave(event)}
                    className="ml-3 text-indigo-400 hover:text-indigo-600 transition"
                  >
                    {isSaved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
                  </button>
                </div>
              </Tilt>
            </motion.div>
          );
        })}

        {/* Skeleton Loader */}
        {loadingMore &&
          Array.from({ length: BATCH_SIZE }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-gray-800 animate-pulse h-72 rounded-2xl border border-gray-900/70"
            />
          ))}
      </div>

      {/* Ref to detect scroll end */}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default EventsCard;
