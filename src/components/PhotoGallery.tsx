import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  category: "childhood" | "teenage" | "adult" | "couple";
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const photosPerPage = 12;

  const photos: GalleryPhoto[] = [
    {
      id: 1,
      url: "/assets/couple/buque-adulto.jpeg",
      caption: "Surpresa",
      category: "couple",
    },
    {
      id: 2,
      url: "/assets/couple/casal-alfredo.jpeg",
      caption: "Jantar",
      category: "couple",
    },
    {
      id: 3,
      url: "/assets/couple/casal-anel.jpeg",
      caption: "O Pedido",
      category: "couple",
    },
    {
      id: 4,
      url: "/assets/couple/casal-aniversario-marco.jpeg",
      caption: "Aniversário de Marco",
      category: "couple",
    },
    {
      id: 5,
      url: "/assets/couple/casal-aniversario.jpeg",
      caption: "Aniversário de Lavi",
      category: "couple",
    },
    {
      id: 6,
      url: "/assets/couple/casal-buque-preto.jpeg",
      caption: "Buquê parte 2",
      category: "couple",
    },
    {
      id: 7,
      url: "/assets/couple/casal-casamento.jpeg",
      caption: "Casamento",
      category: "couple",
    },
    {
      id: 8,
      url: "/assets/couple/casal-chicago.jpeg",
      caption: "Chicago",
      category: "couple",
    },
    {
      id: 9,
      url: "/assets/couple/casal-deck.jpeg",
      caption: "Jantar Noivado",
      category: "couple",
    },
    {
      id: 10,
      url: "/assets/couple/casal-disney.jpeg",
      caption: "Disney",
      category: "couple",
    },
    {
      id: 11,
      url: "/assets/couple/casal-formatura.jpeg",
      caption: "Formatura",
      category: "couple",
    },
    {
      id: 12,
      url: "/assets/couple/casal-lago.jpeg",
      caption: "No Lago",
      category: "couple",
    },
    {
      id: 13,
      url: "/assets/couple/casal-parque-us.jpeg",
      caption: "Parque nos EUA",
      category: "couple",
    },
    {
      id: 14,
      url: "/assets/couple/lavi-adulta-espelho.jpeg",
      caption: "No espelho da sogra",
      category: "adult",
    },
    {
      id: 15,
      url: "/assets/couple/lavi-alfredo.jpeg",
      caption: "No Restaurante",
      category: "adult",
    },
    {
      id: 16,
      url: "/assets/couple/lavi-bebe-1-ano.jpeg",
      caption: "Lavi com 1 ano",
      category: "childhood",
    },
    {
      id: 17,
      url: "/assets/couple/lavi-bebe-mae.jpeg",
      caption: "Lavi bebê com a mãe",
      category: "childhood",
    },
    {
      id: 18,
      url: "/assets/couple/lavi-bebe-vestido.jpeg",
      caption: "Lavi bebê de vestido",
      category: "childhood",
    },
    {
      id: 19,
      url: "/assets/couple/lavi-bebe.jpeg",
      caption: "Lavi bebê",
      category: "childhood",
    },
    {
      id: 20,
      url: "/assets/couple/lavi-crianca-medica.jpeg",
      caption: "Lavi criança de médica",
      category: "childhood",
    },
    {
      id: 21,
      url: "/assets/couple/lavi-crianca-oculos.jpeg",
      caption: "Lavi criança de óculos",
      category: "childhood",
    },
    {
      id: 22,
      url: "/assets/couple/lavi-crianca-pai.jpeg",
      caption: "Lavi e papis",
      category: "childhood",
    },
    {
      id: 23,
      url: "/assets/couple/lavi-crianca-pose.jpeg",
      caption: "Lavi criança modelinha",
      category: "childhood",
    },
    {
      id: 24,
      url: "/assets/couple/lavi-crianca.jpeg",
      caption: "Lavi criança",
      category: "childhood",
    },
    {
      id: 25,
      url: "/assets/couple/lavi-pai-bebe.jpeg",
      caption: "Lavi com papi bebe",
      category: "childhood",
    },
    {
      id: 26,
      url: "/assets/couple/lavi-rai-crianca-asfalto.jpeg",
      caption: "Lavi e Rai crianças no asfalto",
      category: "childhood",
    },
    {
      id: 27,
      url: "/assets/couple/lavi-rai-crianca.jpeg",
      caption: "Lavi e Rai crianças",
      category: "childhood",
    },
    {
      id: 28,
      url: "/assets/couple/lavi-sorriso-crianca.jpeg",
      caption: "Lavi zarolha",
      category: "childhood",
    },
    {
      id: 29,
      url: "/assets/couple/marco-adulto.jpeg",
      caption: "Marco",
      category: "adult",
    },
    {
      id: 30,
      url: "/assets/couple/marco-bebe-bochecha.jpeg",
      caption: "Marco Bochechudo",
      category: "childhood",
    },
    {
      id: 31,
      url: "/assets/couple/marco-bebe-careta.jpeg",
      caption: "Marco bebê fazendo careta",
      category: "childhood",
    },
    {
      id: 32,
      url: "/assets/couple/marco-bebe-irma.jpeg",
      caption: "Kinho e Lu",
      category: "childhood",
    },
    {
      id: 33,
      url: "/assets/couple/marco-bolha.jpeg",
      caption: "Marco Sherlock",
      category: "childhood",
    },
    {
      id: 34,
      url: "/assets/couple/marco-computador-bebe.jpeg",
      caption: "Marco bebê programador",
      category: "childhood",
    },
    {
      id: 35,
      url: "/assets/couple/marco-crianca-mae.jpeg",
      caption: "Marco antes da pirraça",
      category: "childhood",
    },
    {
      id: 36,
      url: "/assets/couple/marco-de-preto.jpeg",
      caption: "Marco criança",
      category: "childhood",
    },
    {
      id: 37,
      url: "/assets/couple/marco-homem-aranha.jpeg",
      caption: "Marco de Homem-Aranha",
      category: "childhood",
    },
    {
      id: 38,
      url: "/assets/couple/marco-mae-terno.jpeg",
      caption: "Marco chefinho",
      category: "childhood",
    },
    {
      id: 39,
      url: "/assets/couple/marco-praia.jpeg",
      caption: "Marco na praia",
      category: "adult",
    },
    {
      id: 40,
      url: "/assets/couple/marco-segurando-joao.jpeg",
      caption: "Marco segurando o João",
      category: "childhood",
    },
    {
      id: 41,
      url: "/assets/couple/sao-joao-casal.jpeg",
      caption: "São João do casal",
      category: "couple",
    },
  ];

  const categories = [
    { key: "all", label: "Todas" },
    { key: "childhood", label: "Infância" },
    { key: "adult", label: "Vida Adulta" },
    { key: "couple", label: "Casal" },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const handlePageChange = (pageNumber: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsAnimating(false);
    }, 300);
  };

  const openModal = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhoto.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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
                ? "bg-wedding-primary text-white shadow-lg"
                : "bg-white/80 text-wedding-dark hover:bg-wedding-secondary hover:text-wedding-primary"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentPhotos.map((photo) => (
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
                <p className="text-white text-sm font-medium">
                  {photo.caption}
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <Camera className="h-5 w-5 text-white/80" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-white/80 text-wedding-dark hover:bg-wedding-secondary hover:text-wedding-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentPage === i + 1
                  ? "w-6 bg-wedding-primary"
                  : "w-3 bg-wedding-primary/30 hover:bg-wedding-primary/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-white/80 text-wedding-dark hover:bg-wedding-secondary hover:text-wedding-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => navigatePhoto("next")}
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
