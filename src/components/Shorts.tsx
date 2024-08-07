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

const thumbnailUrls = [
  "https://cdn270.picsart.com/c9e40661-f4de-43f7-bf23-aaf9cdf19436/449468031024201.gif",
  "https://cdn270.picsart.com/f42c5cd6-835e-444d-a596-eb329b55e580/449468335018201.gif",
  "https://cdn270.picsart.com/c9fe867c-02da-4bcd-a035-084f9c7e65a8/449468685017201.gif",
  "https://cdn270.picsart.com/dfaf76dc-85ad-42ce-a0a7-e3da870eb9bc/449469013028201.gif",
  "https://cdn270.picsart.com/74853273-3c02-480f-b351-f4d2f44ee48d/449469133042201.gif",
  "https://cdn270.picsart.com/73296743-dc6d-43a4-bf43-e6274771e121/449469277012201.gif",
  "https://cdn270.picsart.com/1886a6c4-9e34-4a46-b824-d63494477621/449469399017201.gif",
  "https://cdn270.picsart.com/f84d9290-e4a4-4e80-8b7e-6483fd015dc6/449469498011201.gif",
  "https://cdn270.picsart.com/2d8bb6f5-ec25-40a3-8260-11d24e37c96d/449469648005201.gif",
  "https://cdn270.picsart.com/4f416551-b166-47d7-924c-74b3175ed9f2/449469875029201.gif",
  "https://cdn270.picsart.com/14c2aa7c-2a60-4ef5-a967-7c50c1a0f1ec/449469976007201.gif",
  "https://cdn270.picsart.com/8d1b47aa-37d5-4a29-982e-14fc85fc7aaa/449470083003201.gif",
  "https://cdn270.picsart.com/409af9f4-e3b0-4f18-a4e3-150819234732/449470255012201.gif",
  "https://cdn270.picsart.com/2e2f6698-69f2-4575-be37-378cf05f058d/449470363011201.gif",
  "	https://cdn270.picsart.com/b5904693-9ede-4357-927a-00eb1b71c675/449470482005201.gif",
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

  const buttonSize = isMobile ? "10px" : "30px";
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
              <img
                src={thumbnailUrls[index]}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )).slice(currentSlide, currentSlide + (isMobile ? 2 : 6))}
        </div>
      </div>
    </section>
  );
};

export default Shorts;

