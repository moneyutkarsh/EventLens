import { useState, useEffect, useRef } from "react";
import EventCard from "./EventsCard";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import AiRecommendation from "./AiRecommedation";
import AiChatbot from "./AiChatBot";
import Gallery from "./Gallery";
import { Calendar } from "lucide-react"; // for calendar icons

const defaultEvents = [
  // 🚀 Hackathons
  {
    title: "Codeforces Hackathon",
    description: "Competitive programming challenges.",
    link: "https://codeforces.com",
    logo: "https://sta.codeforces.com/s/69307/images/codeforces-sponsored-by-ton.png",
    date: "Sep 15, 2025",
    category: "🚀 Hackathon",
    tags: ["hackathon", "coding", "competitive"],
    live: true,
    prizePool: "$5000",
    participants: 2000,
  },
  {
    title: "LeetCode Contest",
    description: "Weekly coding contests and problems.",
    link: "https://leetcode.com/contest/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    date: "Sep 20, 2025",
    category: "🚀 Hackathon",
    tags: ["leetcode", "dsa", "coding"],
    prizePool: "$2000",
    participants: 1500,
  },
  {
    title: "Hashnode Hackathon",
    description: "Build and blog your project to win rewards.",
    link: "https://hashnode.com/hackathons",
    logo: "https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/U9tTjXnEv.png",
    date: "Oct 2025",
    category: "🚀 Hackathon",
    tags: ["hackathon", "dev", "blogging"],
    prizePool: "$3000",
    participants: 800,
  },

  // 🌐 Web Development
  {
    title: "React Summit",
    description: "Largest React conference in the world.",
    link: "https://reactsummit.com/",
    logo: "https://reactsummit.com/img/logo.svg",
    date: "Oct 2025",
    category: "🌐 Web Development",
    tags: ["react", "frontend", "javascript"],
    prizePool: "N/A",
    participants: 5000,
  },
  {
    title: "JSNation",
    description: "JavaScript conference for web developers.",
    link: "https://jsnation.com/",
    logo: "https://jsnation.com/img/logo.svg",
    date: "Sep 2025",
    category: "🌐 Web Development",
    tags: ["javascript", "node", "frontend"],
    prizePool: "N/A",
    participants: 3500,
  },
  {
    title: "Next.js Conf",
    description: "Conference by Vercel about Next.js & React.",
    link: "https://nextjs.org/conf",
    logo: "https://nextjs.org/static/twitter-cards/home.jpg",
    date: "Oct 2025",
    category: "🌐 Web Development",
    tags: ["nextjs", "vercel", "react"],
    prizePool: "N/A",
    participants: 4000,
  },

  // 🤖 AI/ML
  {
    title: "Kaggle Competitions",
    description: "Machine Learning challenges & datasets.",
    link: "https://www.kaggle.com/competitions",
    logo: "https://www.kaggle.com/static/images/site-logo.png",
    date: "Ongoing",
    category: "🤖 AI/ML",
    tags: ["ml", "ai", "kaggle"],
    prizePool: "$10000",
    participants: 10000,
  },
  {
    title: "NeurIPS",
    description: "Top AI/ML research conference.",
    link: "https://nips.cc/",
    logo: "https://neurips.cc/Conferences/2025/Images/neurips_logo.png",
    date: "Dec 2025",
    category: "🤖 AI/ML",
    tags: ["research", "ml", "ai"],
    prizePool: "$50000",
    participants: 8000,
  },
  {
    title: "AI Expo Global",
    description: "AI and big data industry expo.",
    link: "https://www.ai-expo.net/",
    logo: "https://www.ai-expo.net/wp-content/uploads/2019/07/ai-expo-logo.png",
    date: "Nov 2025",
    category: "🤖 AI/ML",
    tags: ["ai", "industry", "ml"],
    prizePool: "N/A",
    participants: 3000,
  },

  // ☁️ Cloud
  {
    title: "AWS re:Invent",
    description: "Amazon's biggest cloud computing conference.",
    link: "https://reinvent.awsevents.com/",
    logo: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
    date: "Nov 2025",
    category: "☁️ Cloud",
    tags: ["aws", "cloud", "devops"],
    prizePool: "N/A",
    participants: 6000,
  },
  {
    title: "Google Cloud Next",
    description: "Annual cloud event by Google.",
    link: "https://cloud.withgoogle.com/next",
    logo: "https://cloud.google.com/images/social-icon-google-cloud-1200-630.png",
    date: "Oct 2025",
    category: "☁️ Cloud",
    tags: ["gcp", "cloud", "infrastructure"],
    prizePool: "N/A",
    participants: 4000,
  },
  {
    title: "Microsoft Ignite",
    description: "Microsoft’s cloud and enterprise conference.",
    link: "https://ignite.microsoft.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    date: "Nov 2025",
    category: "☁️ Cloud",
    tags: ["azure", "cloud", "enterprise"],
    prizePool: "N/A",
    participants: 4500,
  },

  // 🛡️ Cybersecurity
  {
    title: "DEF CON",
    description: "One of the world’s largest hacker conventions.",
    link: "https://defcon.org/",
    logo: "https://defcon.org/images/defcon-30/defcon-30-logo.png",
    date: "Aug 2025",
    category: "🛡️ Cybersecurity",
    tags: ["security", "hacking", "ctf"],
    prizePool: "$10000",
    participants: 5000,
  },
  {
    title: "Black Hat USA",
    description: "Cutting-edge security research conference.",
    link: "https://blackhat.com/",
    logo: "https://www.blackhat.com/images/logo-blackhat.svg",
    date: "Jul 2025",
    category: "🛡️ Cybersecurity",
    tags: ["cybersecurity", "infosec", "research"],
    prizePool: "$20000",
    participants: 4000,
  },
  {
    title: "OWASP Global AppSec",
    description: "Application security conference by OWASP.",
    link: "https://owasp.org/events/",
    logo: "https://owasp.org/assets/images/logo.png",
    date: "Sep 2025",
    category: "🛡️ Cybersecurity",
    tags: ["appsec", "owasp", "security"],
    prizePool: "N/A",
    participants: 3000,
  },

  // 🎤 Speaker Platforms
  {
    title: "Sessionize",
    description: "Apply as a tech speaker worldwide.",
    link: "https://sessionize.com/",
    logo: "https://sessionize.com/Content/img/logo.svg",
    date: "Ongoing",
    category: "🎤 Speaker",
    tags: ["cfp", "speaker", "conference"],
    prizePool: "N/A",
    participants: 1000,
  },
  {
    title: "Papercall",
    description: "Platform for finding & submitting CFPs.",
    link: "https://www.papercall.io/",
    logo: "https://www.papercall.io/assets/images/papercall-logo.svg",
    date: "Ongoing",
    category: "🎤 Speaker",
    tags: ["cfp", "speaking", "conference"],
    prizePool: "N/A",
    participants: 800,
  },

  // 📌 CFP Aggregators
  {
    title: "CFP Land",
    description: "Weekly newsletter with open CFPs.",
    link: "https://www.cfp.land/",
    logo: "https://cfpland.com/images/logo.png",
    date: "Weekly",
    category: "📌 CFP",
    tags: ["cfp", "newsletter"],
    prizePool: "N/A",
    participants: 500,
  },
  {
    title: "Tech CFPs",
    description: "Curated list of CFPs for tech conferences.",
    link: "https://techcfp.com/",
    logo: "https://techcfp.com/logo192.png",
    date: "Ongoing",
    category: "📌 CFP",
    tags: ["cfp", "calls", "conferences"],
    prizePool: "N/A",
    participants: 700,
  },

  // 🌍 Networking
  {
    title: "Meetup",
    description: "Find local groups & speaker invites.",
    link: "https://www.meetup.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Meetup_Logo.png",
    date: "Ongoing",
    category: "🌍 Networking",
    tags: ["community", "networking"],
    prizePool: "N/A",
    participants: 3000,
  },
  {
    title: "Dev.to Meetups",
    description: "Developer community meetups and networking.",
    link: "https://dev.to/meetups",
    logo: "https://d2fltix0v2e0sb.cloudfront.net/dev-black.png",
    date: "Ongoing",
    category: "🌍 Networking",
    tags: ["dev", "community", "networking"],
    prizePool: "N/A",
    participants: 2000,
  },
  {
    title: "Product Hunt Meetups",
    description: "Events for makers & startup enthusiasts.",
    link: "https://www.producthunt.com/",
    logo: "https://ph-files.imgix.net/5ef2a9c7-df47-4633-8512-7f98efb725f8.png",
    date: "Ongoing",
    category: "🌍 Networking",
    tags: ["startups", "makers", "networking"],
    prizePool: "N/A",
    participants: 1500,
  },
];


const placeholderTexts = [
  "🔍 Search events...",
  "💻 Find Hackathons...",
  "🤖 Explore AI/ML...",
  "☁️ Discover Cloud events...",
  "🛡️ Cybersecurity conferences...",
];

const Events = () => {
  const [eventsData, setEventsData] = useState(defaultEvents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("✨ All");
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);
  const placeholderIndex = useRef(0);

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      placeholderIndex.current =
        (placeholderIndex.current + 1) % placeholderTexts.length;
      setPlaceholder(placeholderTexts[placeholderIndex.current]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEventsData([...defaultEvents, ...savedEvents]);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedEvents", JSON.stringify(bookmarkedEvents));
  }, [bookmarkedEvents]);

  const toggleBookmark = (event) => {
    if (bookmarkedEvents.some((e) => e.title === event.title)) {
      setBookmarkedEvents(
        bookmarkedEvents.filter((e) => e.title !== event.title)
      );
    } else {
      setBookmarkedEvents([...bookmarkedEvents, event]);
    }
  };

  const categories = [
    "🚀 Hackathon",
    "🌐 Web Development",
    "🤖 AI/ML",
    "☁️ Cloud",
    "🛡️ Cybersecurity",
    "🎤 Speaker",
    "📌 CFP",
    "🌍 Networking",
  ];

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "✨ All" || event.category === category;

    let matchesDate = true;
    if (startDate || endDate) {
      const eventDate = new Date(event.date);
      if (startDate && eventDate < new Date(startDate)) matchesDate = false;
      if (endDate && eventDate > new Date(endDate)) matchesDate = false;
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  const upcomingEvents = filteredEvents.filter(
    (event) => event.live || event.date.includes("2025")
  );

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dark Blue Shady Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-gray-900 z-0"></div>

     {/* Twinkling Stars Background */}
<div className="absolute inset-0 z-0">
  {[...Array(80)].map((_, i) => (
    <motion.span
      key={i}
      className="absolute w-[2px] h-[2px] bg-white rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.2,
      }}
      animate={{
        opacity: [0.2, 1, 0.2], // twinkle effect
        scale: [1, 1.3, 1], // slight shimmer
      }}
      transition={{
        duration: Math.random() * 4 + 3, // 3s–7s per twinkle
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ))}
</div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <br />
        <br />
        <br />

        <div className="p-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4">🚀 Explore Tech Events</h1>
          <p className="text-gray-300 text-lg">
            Hackathons, Web Dev, AI/ML, Cloud, Cybersecurity, CFPs & more
          </p>
        </div>

        <AiRecommendation eventsData={eventsData} />

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-4 px-10 mt-8 flex-wrap md:flex-nowrap items-center">
          {/* Search Bar */}
          <motion.div className="relative w-full md:w-1/4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="text"
              placeholder={placeholder}
              className="px-4 py-3 rounded-xl w-full text-black focus:outline-none bg-gray-100 placeholder-gray-500 font-medium transition-shadow duration-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* Category Dropdown */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-4 py-3 rounded-xl text-black w-full md:w-1/5 focus:outline-none bg-gray-100 font-medium transition-shadow duration-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="✨ All">✨ All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </motion.select>

          {/* Start Date */}
          <motion.div className="relative w-full md:w-1/6">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="date"
              className="pl-10 pr-4 py-3 rounded-xl w-full text-black focus:outline-none bg-gray-100 font-medium transition-shadow duration-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </motion.div>

          {/* End Date */}
          <motion.div className="relative w-full md:w-1/6">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="date"
              className="pl-10 pr-4 py-3 rounded-xl w-full text-black focus:outline-none bg-gray-100 font-medium transition-shadow duration-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Saved Events */}
        {bookmarkedEvents.length > 0 && (
          <div className="px-10 mt-12">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">
              ⭐ Saved Events
            </h2>
            <EventCard
              eventsData={bookmarkedEvents}
              toggleBookmark={toggleBookmark}
              bookmarkedEvents={bookmarkedEvents}
            />
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="px-10 mt-12">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">
              🔥 Upcoming & Live Events
            </h2>
            <EventCard
              eventsData={upcomingEvents}
              toggleBookmark={toggleBookmark}
              bookmarkedEvents={bookmarkedEvents}
            />
          </div>
        )}

        {/* Categorized Sections */}
        {categories.map((cat) => {
          const catEvents = filteredEvents.filter(
            (event) => event.category === cat
          );
          if (catEvents.length === 0) return null;

          return (
            <div key={cat} className="px-10 mt-12">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                {cat}
              </h2>
              <EventCard
                eventsData={catEvents}
                toggleBookmark={toggleBookmark}
                bookmarkedEvents={bookmarkedEvents}
              />
            </div>
          );
        })}

        <br />
        <Gallery />
        <br />
        <Footer />
        <AiChatbot eventsData={eventsData} />
      </div>
    </div>
  );
};

export default Events;