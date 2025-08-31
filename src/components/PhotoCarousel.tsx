import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { photos } from "./photoCarouselData";
import ProgressiveImage from "./ProgressiveImage";

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
                <ProgressiveImage
                  src={photo.src}
                  placeholder={photo.placeholder}
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
