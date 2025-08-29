import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Photo {
  id: number;
  url: string;
}

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const photos: Photo[] = [
    { id: 1, url: "/assets/pre-wedding/IMG_8003.jpg" },
    { id: 2, url: "/assets/pre-wedding/IMG_8006.jpg" },
    { id: 3, url: "/assets/pre-wedding/IMG_8013.jpg" },
    { id: 4, url: "/assets/pre-wedding/IMG_8025.jpg" },
    { id: 5, url: "/assets/pre-wedding/IMG_8051.jpg" },
    { id: 6, url: "/assets/pre-wedding/IMG_8055.jpg" },
    { id: 7, url: "/assets/pre-wedding/IMG_8078.jpg" },
    { id: 8, url: "/assets/pre-wedding/IMG_8094.jpg" },
    { id: 9, url: "/assets/pre-wedding/IMG_8118.jpg" },
    { id: 10, url: "/assets/pre-wedding/IMG_8121.jpg" },
    { id: 11, url: "/assets/pre-wedding/IMG_8131-2.jpg" },
    { id: 12, url: "/assets/pre-wedding/IMG_8131.jpg" },
    { id: 13, url: "/assets/pre-wedding/IMG_8155-2.jpg" },
    { id: 14, url: "/assets/pre-wedding/IMG_8155.jpg" },
    { id: 15, url: "/assets/pre-wedding/IMG_8179.jpg" },
    { id: 16, url: "/assets/pre-wedding/IMG_8230.jpg" },
    { id: 17, url: "/assets/pre-wedding/IMG_8263.jpg" },
    { id: 18, url: "/assets/pre-wedding/IMG_8291.jpg" },
    { id: 19, url: "/assets/pre-wedding/IMG_8326.jpg" },
    { id: 20, url: "/assets/pre-wedding/IMG_8337.jpg" },
    { id: 21, url: "/assets/pre-wedding/IMG_8367.jpg" },
    { id: 22, url: "/assets/pre-wedding/IMG_8377.jpg" },
  ];

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex) return;
      setCurrentIndex(newIndex);
    },
    [setCurrentIndex, currentIndex],
  );

  const nextSlide = useCallback(() => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  }, [currentIndex, photos.length, changeSlide]);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, nextSlide]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div
        className="relative h-[35rem] rounded-3xl overflow-hidden shadow-2xl bg-black"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {photos.map((photo) => (
              <div key={photo.id} className="w-full h-full flex-shrink-0">
                <img
                  src={photo.url}
                  alt="Pre-wedding photo"
                  className={"w-full h-full object-cover"}
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Heart Icon Overlay */}
        <div className="absolute top-6 right-6 opacity-80">
          <Heart className="h-8 w-8 text-white/80 fill-current animate-pulse-soft" />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-wedding-primary scale-125 shadow-lg"
                : "bg-wedding-primary/30 hover:bg-wedding-primary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
