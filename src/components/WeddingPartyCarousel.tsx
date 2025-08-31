import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Users } from "lucide-react";
import { weddingParty } from "./weddingPartyData";

const WeddingPartyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [displayedItemsPerSlide, setDisplayedItemsPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDisplayedItemsPerSlide(3);
      } else {
        setDisplayedItemsPerSlide(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(weddingParty.length / displayedItemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <>
      {/* Header with counts */}
      <div className="text-center mb-8">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-wedding-primary" />
            <span className="text-base sm:text-lg font-semibold text-wedding-primary text-center">
              {weddingParty.filter((m) => m.role === "bestman").length}{" "}
              Padrinhos
            </span>
          </div>
          <Heart className="h-5 w-5 text-wedding-accent" />
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-wedding-primary" />
            <span className="text-base sm:text-lg font-semibold text-wedding-primary text-center">
              {weddingParty.filter((m) => m.role === "bridesmaid").length}{" "}
              Madrinhas
            </span>
          </div>
          <Heart className="h-5 w-5 text-wedding-accent" />
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-wedding-primary" />
            <span className="text-base sm:text-lg font-semibold text-wedding-primary text-center">
              {weddingParty.filter((m) => m.role === "couple").length} Casais
            </span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="flex flex-wrap justify-center gap-6 p-4">
                  {weddingParty
                    .slice(
                      slideIndex * displayedItemsPerSlide,
                      (slideIndex + 1) * displayedItemsPerSlide,
                    )
                    .map((member) => (
                      <div
                        key={member.id}
                        className="w-full sm:w-1/2 md:w-1/4 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      >
                        {/* Photo */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                              member.role === "bestman"
                                ? "bg-wedding-primary"
                                : member.role === "bridesmaid"
                                  ? "bg-wedding-accent"
                                  : "bg-wedding-dark"
                            }`}
                          >
                            {member.role === "bestman"
                              ? "Padrinho"
                              : member.role === "bridesmaid"
                                ? "Madrinha"
                                : "Casal"}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-wedding-dark mb-2">
                            {member.name}
                          </h3>
                          <p className="text-sm text-wedding-primary font-medium mb-3">
                            {member.relationship}
                          </p>
                          <p className="text-wedding-dark text-sm leading-relaxed">
                            {member.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-wedding-primary p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-wedding-primary p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
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

      <div className="text-center mt-4">
        <span className="text-sm text-wedding-dark">
          {currentIndex + 1} de {totalSlides}
        </span>
      </div>
    </>
  );
};

export default WeddingPartyCarousel;
