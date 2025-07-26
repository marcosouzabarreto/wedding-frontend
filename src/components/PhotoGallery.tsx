import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  category: 'childhood' | 'teenage' | 'adult' | 'couple';
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const photos: GalleryPhoto[] = [
    // Childhood photos
    {
      id: 1,
      url: "https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco aos 5 anos",
      category: 'childhood'
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia aos 4 anos",
      category: 'childhood'
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1104014/pexels-photo-1104014.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco brincando no parque",
      category: 'childhood'
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia no primeiro dia de aula",
      category: 'childhood'
    },
    // Teenage photos
    {
      id: 5,
      url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco na formatura do ensino médio",
      category: 'teenage'
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia aos 16 anos",
      category: 'teenage'
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco jogando futebol",
      category: 'teenage'
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia na festa de 15 anos",
      category: 'teenage'
    },
    // Adult photos
    {
      id: 9,
      url: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco na faculdade",
      category: 'adult'
    },
    {
      id: 10,
      url: "https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia se formando",
      category: 'adult'
    },
    {
      id: 11,
      url: "https://images.pexels.com/photos/1043470/pexels-photo-1043470.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Marco no primeiro emprego",
      category: 'adult'
    },
    {
      id: 12,
      url: "https://images.pexels.com/photos/1043469/pexels-photo-1043469.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Lavinia viajando",
      category: 'adult'
    },
    // Couple photos
    {
      id: 13,
      url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Nosso primeiro encontro",
      category: 'couple'
    },
    {
      id: 14,
      url: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Primeira viagem juntos",
      category: 'couple'
    },
    {
      id: 15,
      url: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "O pedido de casamento",
      category: 'couple'
    },
    {
      id: 16,
      url: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Celebrando nosso noivado",
      category: 'couple'
    }
  ];

  const categories = [
    { key: 'all', label: 'Todas' },
    { key: 'childhood', label: 'Infância' },
    { key: 'teenage', label: 'Adolescência' },
    { key: 'adult', label: 'Vida Adulta' },
    { key: 'couple', label: 'Casal' }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openModal = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category.key
                ? 'bg-wedding-primary text-white shadow-lg'
                : 'bg-white/80 text-wedding-dark hover:bg-wedding-secondary hover:text-wedding-primary'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            onClick={() => openModal(photo)}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
              <div className="absolute top-4 right-4">
                <Camera className="h-5 w-5 text-white/80" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;