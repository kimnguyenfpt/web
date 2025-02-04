import React, { useEffect, useState } from 'react';

function Banner() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => (prevIndex + n + 3) % 3);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[800px]">
        {/* Slide 1 */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            slideIndex === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/img/banner/banner1.jpg"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide 2 */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            slideIndex === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/img/banner/banner2.jpg"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide 3 */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            slideIndex === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/img/banner/banner3.jpg"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
          onClick={() => plusSlides(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
          onClick={() => plusSlides(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              slideIndex === index ? 'bg-teal-500' : 'bg-gray-400'
            } cursor-pointer`}
            onClick={() => setSlideIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Banner;
