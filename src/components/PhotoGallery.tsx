import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { photos, GalleryPhoto } from "./photoGalleryData";
import ProgressiveImage from "./ProgressiveImage";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const photosPerPage = 12;

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
    indexOfLastPhoto,
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
      (p) => p.id === selectedPhoto.id,
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
            <ProgressiveImage
              src={photo.src}
              placeholder={photo.placeholder}
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
            <ProgressiveImage
              src={selectedPhoto.modalSrc}
              placeholder={selectedPhoto.src}
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
