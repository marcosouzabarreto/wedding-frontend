// src/components/Countdown.tsx
import { useState, useEffect } from "react";

// Define the shape of our time left object
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Define the props for our component
interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

// A small, reusable component for each time unit (Days, Hours, etc.)
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-32 h-32 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-wedding-primary/30">
      {/* Calendar-like header */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-wedding-primary text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
        {label}
      </div>

      {/* Main number display */}
      {/* The 'key={value}' is the magic for the animation.
          When the value changes, React sees a new key and re-mounts the element,
          triggering the 'animate-pop-in' animation. */}
      <div
        key={value}
        className="text-5xl md:text-6xl font-bold text-wedding-primary animate-pop-in"
      >
        {String(value).padStart(2, "0")}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-3 flex justify-center space-x-1">
        <div className="w-2 h-2 bg-wedding-primary/30 rounded-full"></div>
        <div className="w-2 h-2 bg-wedding-primary/50 rounded-full"></div>
        <div className="w-2 h-2 bg-wedding-primary/30 rounded-full"></div>
      </div>
    </div>
  </div>
);

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null; // Return null when the countdown is over
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft(),
  );

  useEffect(() => {
    // If the countdown is already finished on mount, call onComplete
    if (!timeLeft) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        // Time is up!
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeLabels: { [key in keyof TimeLeft]: string } = {
    days: "Dias",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
      {timeLeft ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <TimeUnit
            key={unit}
            value={value}
            label={timeLabels[unit as keyof TimeLeft]}
          />
        ))
      ) : (
        // This part will not be visible as the parent component will show the "We're Married!" message
        // But it's good practice to handle the null state.
        <div />
      )}
    </div>
  );
};

export default Countdown;
