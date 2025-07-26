import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users } from 'lucide-react';

interface WeddingPartyMember {
  id: number;
  name: string;
  role: 'bestman' | 'maid';
  photo: string;
  description: string;
  relationship: string;
}

const WeddingPartyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const weddingParty: WeddingPartyMember[] = [
    // Best Men
    {
      id: 1,
      name: "Carlos Silva",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Melhor amigo desde a infância, sempre presente nos momentos mais importantes.",
      relationship: "Melhor amigo"
    },
    {
      id: 2,
      name: "Roberto Santos",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Companheiro de faculdade e parceiro de aventuras.",
      relationship: "Amigo da faculdade"
    },
    {
      id: 3,
      name: "João Oliveira",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Irmão de coração, sempre disposto a ajudar.",
      relationship: "Como um irmão"
    },
    {
      id: 4,
      name: "Pedro Costa",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1043470/pexels-photo-1043470.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Colega de trabalho que se tornou grande amigo.",
      relationship: "Amigo do trabalho"
    },
    {
      id: 5,
      name: "Lucas Ferreira",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1043469/pexels-photo-1043469.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Primo querido e confidente de todas as horas.",
      relationship: "Primo"
    },
    {
      id: 6,
      name: "André Martins",
      role: "bestman",
      photo: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Amigo leal que conhece todos os segredos.",
      relationship: "Amigo íntimo"
    },
    // Maids of Honor
    {
      id: 7,
      name: "Ana Paula",
      role: "maid",
      photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Melhor amiga desde sempre, irmã que a vida me deu.",
      relationship: "Melhor amiga"
    },
    {
      id: 8,
      name: "Mariana Costa",
      role: "maid",
      photo: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Companheira de todas as aventuras e confidências.",
      relationship: "Amiga da escola"
    },
    {
      id: 9,
      name: "Juliana Santos",
      role: "maid",
      photo: "https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Prima querida e conselheira de todas as horas.",
      relationship: "Prima"
    },
    {
      id: 10,
      name: "Fernanda Lima",
      role: "maid",
      photo: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Amiga da faculdade que se tornou família.",
      relationship: "Amiga da faculdade"
    },
    {
      id: 11,
      name: "Camila Rocha",
      role: "maid",
      photo: "https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Colega de trabalho e grande apoio em todos os momentos.",
      relationship: "Amiga do trabalho"
    },
    {
      id: 12,
      name: "Beatriz Alves",
      role: "maid",
      photo: "https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Amiga especial que sempre traz alegria e bons conselhos.",
      relationship: "Amiga querida"
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(weddingParty.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const getCurrentSlideMembers = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return weddingParty.slice(startIndex, startIndex + itemsPerSlide);
  };

  const bestMen = weddingParty.filter(member => member.role === 'bestman');
  const maids = weddingParty.filter(member => member.role === 'maid');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-wedding-primary" />
            <span className="text-lg font-semibold text-wedding-primary">
              {bestMen.length} Padrinhos
            </span>
          </div>
          <Heart className="h-5 w-5 text-wedding-accent" />
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-wedding-primary" />
            <span className="text-lg font-semibold text-wedding-primary">
              {maids.length} Madrinhas
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Carousel */}
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-3 gap-6 p-4">
                  {weddingParty
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((member) => (
                      <div
                        key={member.id}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      >
                        {/* Photo */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          {/* Role Badge */}
                          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            member.role === 'bestman' 
                              ? 'bg-wedding-primary' 
                              : 'bg-wedding-accent'
                          }`}>
                            {member.role === 'bestman' ? 'Padrinho' : 'Madrinha'}
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

        {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
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

      {/* Slide Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-wedding-dark">
          {currentIndex + 1} de {totalSlides}
        </span>
      </div>
    </div>
  );
};

export default WeddingPartyCarousel;