import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./pages/hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./Components/events";
import SavedEvents from "./pages/SavedEvents";
import { SavedEventsProvider } from "./pages/SavedEventsContext";
import TechPulseDetail from "./pages/TechPulseDetail";
import TechPulse from "./pages/TechPulse";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./Components/NavBar";
import About from "./pages/About";
import Dashboard from "./pages/DashBoard";

// ✅ Wrapper to apply dark blue background with dotted effect
function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f2c] to-[#1e293b] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function App() {
  const location = useLocation();

  // Hide Navbar on login, signup, hero, and create-event
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/" ||
    location.pathname === "/create-event";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ✅ Hero stays plain */}
        <Route path="/" element={<Hero />} />

        {/* ✅ Login / Signup / CreateEvent stay plain */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-event" element={<CreateEvent />} />

        {/* ✅ All other pages wrapped in dark background */}
        <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="/saved" element={<PageWrapper><SavedEvents /></PageWrapper>} />
        <Route path="/techpulse" element={<PageWrapper><TechPulse /></PageWrapper>} />
        <Route path="/techpulse/:id" element={<PageWrapper><TechPulseDetail /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
      </Routes>
    </>
  );
}

// ✅ Wrap App with Router & SavedEventsProvider
export default function AppWrapper() {
  return (
    <SavedEventsProvider>
      <Router>
        <App />
      </Router>
    </SavedEventsProvider>
  );
}
