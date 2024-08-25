import React, { useEffect, useState } from 'react';

function Banner() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const slides = document.getElementsByClassName('mySlides');
    const showSlides = () => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      setSlideIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % slides.length;
        slides[newIndex].style.display = 'block';
        return newIndex;
      });
    };

    const interval = setInterval(showSlides, 4000);

    return () => clearInterval(interval);
  }, []);

  const plusSlides = (n) => {
    const slides = document.getElementsByClassName('mySlides');
    let newIndex = (slideIndex + n) % slides.length;
    if (newIndex < 0) newIndex = slides.length - 1;
    setSlideIndex(newIndex);
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[newIndex].style.display = 'block';
  };

  return (
    <section id="hero">
      <div className="slideshow-container">
        <div className="mySlides fade" style={{ display: slideIndex === 0 ? 'block' : 'none' }}>
          <img src="/img/banner/banner1.jpg" style={{ width: '100%' }} />
        </div>
        <div className="mySlides fade" style={{ display: slideIndex === 1 ? 'block' : 'none' }}>
          <img src="/img/banner/banner2.jpg" style={{ width: '100%' }} />
        </div>
        <div className="mySlides fade" style={{ display: slideIndex === 2 ? 'block' : 'none' }}>
          <img src="/img/banner/banner.jpg" style={{ width: '100%' }} />
        </div>
        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
    </section>
  );
}

export default Banner;
