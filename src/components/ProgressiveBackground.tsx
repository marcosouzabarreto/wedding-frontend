import { useState, useEffect } from "react";

interface ProgressiveBackgroundProps {
  src: string;
  placeholder: string;
  className?: string;
  children?: React.ReactNode;
}

const ProgressiveBackground = ({
  src,
  placeholder,
  className,
  children,
}: ProgressiveBackgroundProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className={`relative ${className || ""}`}>
      <div
        className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 blur-xl scale-105 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${placeholder})` }}
      />

      <div
        className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${src})` }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default ProgressiveBackground;
