import { useState } from "react";

interface ProgressiveImageProps {
  src: string;
  placeholder: string;
  alt: string;
  className?: string;
}

const ProgressiveImage = ({
  src,
  placeholder,
  alt,
  className,
}: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      {/* Blurry placeholder */}
      <img
        src={placeholder}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100 blur-lg scale-105"
        }`}
      />

      {/* Full image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ProgressiveImage;
