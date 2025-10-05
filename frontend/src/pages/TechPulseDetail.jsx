import { useParams, Link } from "react-router-dom";

const blogDetails = {
  1: {
    title: "Top 10 Emerging Tech Trends in 2025",
    content: `
      From AI-driven coding assistants to quantum computing breakthroughs, 2025 is shaping up to be a 
      revolutionary year in technology. Developers and businesses are rapidly adopting AI in every 
      sector, while blockchain, Web3, and cybersecurity are evolving faster than ever.
      
      - **AI Everywhere**: From code generation to design assistance.
      - **Quantum Computing**: Still niche, but companies like IBM and Google are making big moves.
      - **Edge Computing**: Low latency applications for IoT and AR/VR.
      - **Sustainable Tech**: Energy-efficient AI models and green computing.
      
      Staying updated with these trends is crucial for developers and startups alike.
    `,
    events: [
      "ETHGlobal 2025 – Global Web3 Hackathon Series",
      "Google Cloud Next Hackathon",
      "Microsoft Imagine Cup 2025",
    ],
  },
  2: {
    title: "How Hackathons Are Changing Developer Careers",
    content: `
      Hackathons are no longer just fun weekend coding challenges. They’ve become career accelerators, 
      networking hubs, and innovation launchpads. Many successful startups like **Devfolio, HackerRank, 
      and even Instagram** started as hackathon ideas.
      
      Developers benefit by:
      - Learning new skills under pressure.
      - Building real-world projects in days.
      - Meeting mentors, recruiters, and investors.
      - Landing jobs or even starting companies.
    `,
    events: [
      "HackMIT – Massachusetts Institute of Technology",
      "AngelHack Global Hackathon Series",
      "Hack the North – Canada’s Largest Hackathon",
    ],
  },
  3: {
    title: "The Rise of AI Tools in Everyday Coding",
    content: `
      AI tools like GitHub Copilot, ChatGPT, Tabnine, and Replit Ghostwriter are transforming coding. 
      Instead of writing every line from scratch, developers now collaborate with AI to write, debug, 
      and optimize code.
      
      Benefits:
      - Faster prototyping.
      - Smarter debugging and suggestions.
      - Leveling the field for beginner developers.
      
      But with great power comes responsibility—AI-driven code also raises questions about plagiarism, 
      intellectual property, and over-reliance.
    `,
    events: [
      "AI Global Summit 2025",
      "OpenAI DevCon",
      "AI Hackathon by Hugging Face",
    ],
  },
  4: {
    title: "Cybersecurity in the Age of AI",
    content: `
      AI is both a shield and a sword in cybersecurity. Attackers use AI to create sophisticated 
      phishing emails, malware, and deepfakes, while defenders use AI to detect anomalies, stop 
      threats in real-time, and predict attacks before they happen.
      
      Key concerns:
      - Data privacy and protection.
      - Ethical AI use.
      - Global collaboration for secure AI.
    `,
    events: [
      "DEF CON 2025 – The World’s Largest Hacking Conference",
      "Black Hat USA 2025",
      "OWASP Global AppSec",
    ],
  },
  5: {
    title: "Why Open Source is Thriving in 2025",
    content: `
      Open source is no longer just for hobbyists—it’s powering the world. From Linux servers to 
      Kubernetes to AI models, open-source innovation is at the core of global tech infrastructure.
      
      Reasons for growth:
      - Companies trust open collaboration.
      - Developers love contributing and showcasing skills.
      - Communities accelerate problem-solving.
      
      GitHub and GitLab report record-breaking contributions, with AI projects leading the charts.
    `,
    events: [
      "GitHub Universe 2025",
      "Open Source Summit North America",
      "FOSDEM 2025 – Free and Open Source Developers' Meeting",
    ],
  },
  6: {
    title: "Breaking Into Web3 as a Developer",
    content: `
      Web3 is reshaping the internet with decentralization, blockchain, and ownership at its core. 
      Developers entering Web3 can build **dApps, NFTs, DAOs, and smart contracts**. 
      
      Why Web3 is exciting:
      - Decentralized finance (DeFi) is booming.
      - NFTs are expanding into gaming, real estate, and art.
      - DAOs are redefining governance models.
      
      Skills you need: Solidity, Rust, blockchain fundamentals, and an open mindset.
    `,
    events: [
      "ETHGlobal Hackathon 2025",
      "Consensus 2025 – Web3 & Blockchain Conference",
      "Polkadot Decoded",
    ],
  },
};

export default function TechPulseDetail() {
  const { id } = useParams();
  const post = blogDetails[id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Post not found.
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">{post.title}</h1>
        <div className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-purple-300">
          🔥 Top Hackathons & Events
        </h2>
        <ul className="list-disc pl-6 text-gray-300 mb-8">
          {post.events.map((event, idx) => (
            <li key={idx} className="mb-2">
              {event}
            </li>
          ))}
        </ul>

        <Link
          to="/techpulse"
          className="text-purple-400 hover:text-purple-300 font-medium transition"
        >
          ← Back to TechPulse
        </Link>
      </div>
    </div>
  );
}
