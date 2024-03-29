import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const videoUrls = [
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid1.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid2.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid3.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid4.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid5.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid6.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid7.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid8.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid9.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid10.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid11.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid12.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid13.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid14.mp4",
  "https://res.cloudinary.com/dhenxlgm5/video/upload/v1711530824/demo/vid15.mp4",
];

const Shorts: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.touches[0].clientX;
    const difference = touchStartX.current - touchEndX;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
  };

  const handlePrevClick = () => {
    if (currentSlide === 0) return;
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextClick = () => {
    if (currentSlide === videoUrls.length - (isMobile ? 1 : 6)) return;
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const handleVideoClick = (videoIndex: number) => {
    router.push(`/video/${videoIndex}`);
  };

  const videoHeight = isMobile ? "300px" : "400px";
  const videoWidth = isMobile ? "170px" : "250px";

  const buttonSize = isMobile ? "30px" : "50px";
  const buttonStyle = { fontSize: buttonSize, fontWeight: "bold" };

  return (
    <section className="px-4 py-8">
      <div className="relative">
        <div className="flex justify-center items-center mb-4">
          {!isMobile && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4"
              style={buttonStyle}
              onClick={handlePrevClick}
              disabled={currentSlide === 0}
            >
              &#8592;
            </button>
          )}
          <h2 className="text-2xl font-bold">SHORTS</h2>
          {!isMobile && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4"
              style={buttonStyle}
              onClick={handleNextClick}
              disabled={currentSlide === videoUrls.length - 1}
            >
              &#8594;
            </button>
          )}
        </div>
        <div
          className="flex justify-center overflow-hidden"
          style={{ maxWidth: "100%" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {videoUrls.map((videoUrl, index) => (
            <div
              key={index}
              className="mx-2 my-2 rounded-lg overflow-hidden"
              style={{ height: videoHeight, width: videoWidth }}
              onClick={() => handleVideoClick(index)}
            >
              <video
                autoPlay
                loop
                muted
                className="w-full h-full rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )).slice(currentSlide, currentSlide + (isMobile ? 2 : 6))}
        </div>
      </div>
    </section>
  );
};

export default Shorts;
