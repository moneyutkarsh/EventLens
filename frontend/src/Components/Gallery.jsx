import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://source.unsplash.com/random/800x600?tech,1",
  "https://source.unsplash.com/random/800x600?tech,2",
  "https://source.unsplash.com/random/800x600?tech,3",
  "https://source.unsplash.com/random/800x600?tech,4",
];

const Gallery = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence>
          <motion.img
            key={current}
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-96 object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Gallery;
