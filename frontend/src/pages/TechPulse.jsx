import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TechPulse() {
  const [news, setNews] = useState([]);

  // Blog posts (static for now)
  const blogPosts = [
    { id: 1, title: "The Rise of AI in 2025", excerpt: "How AI is shaping our world...", image: "https://source.unsplash.com/600x400/?ai,technology" },
    { id: 2, title: "Top 10 Hackathons to Join", excerpt: "Find the most exciting hackathons...", image: "https://source.unsplash.com/600x400/?coding,hackathon" },
    { id: 3, title: "Future of Web3", excerpt: "Decentralized web and its potential...", image: "https://source.unsplash.com/600x400/?blockchain,crypto" },
    { id: 4, title: "Cloud Computing in 2025", excerpt: "The shift towards serverless architecture...", image: "https://source.unsplash.com/600x400/?cloud,server" },
    { id: 5, title: "Cybersecurity Trends", excerpt: "How to stay safe in the digital age...", image: "https://source.unsplash.com/600x400/?cybersecurity,hacking" },
    { id: 6, title: "Future of Startups", excerpt: "Where the next unicorns will rise...", image: "https://source.unsplash.com/600x400/?startup,entrepreneur" },
  ];

  // Fetch latest tech news
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            "technology OR hackathon OR coding OR AI"
          )}&language=en&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API}`
        );
        const data = await res.json();
        setNews(data.articles?.slice(0, 6) || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);
  
  return (
    <div >
      <h1 className="text-4xl font-bold mb-8 text-center">
        <br></br>
      📘 Featured Articles
      </h1>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <Link
                to={`/techpulse/${post.id}`}
                className="text-purple-400 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* News Section */}
      <h2 className="text-2xl font-semibold mb-4">📰 Latest Tech News</h2>
      <div className="space-y-6">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3 className="text-lg font-bold hover:text-purple-400 transition">
                  {article.title}
                </h3>
              </a>
              <p className="text-gray-400 text-sm mt-2">
                {article.description || "No description available"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Loading news...</p>
        )}
      </div>
    </div>
  );
}

