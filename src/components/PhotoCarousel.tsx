import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Placeholder photos - these can be replaced with actual couple photos
  const photos: Photo[] = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Nosso primeiro encontro"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Viagem romântica"
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "O pedido de casamento"
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Celebrando nosso amor"
    }
  ];

  const changeSlide = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div 
        className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            key={currentIndex}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Caption */}
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <p className="text-white text-lg md:text-xl font-medium bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
              {photos[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
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
                ? 'bg-wedding-primary scale-125 shadow-lg'
                : 'bg-wedding-primary/30 hover:bg-wedding-primary/60'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2 px-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-4 ring-wedding-primary shadow-xl'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;