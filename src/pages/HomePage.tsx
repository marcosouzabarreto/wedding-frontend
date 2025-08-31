import { useState } from "react";
import { Heart, Calendar, MapPin, Clock, ChevronDown } from "lucide-react";
import Countdown from "../components/Countdown";
import PhotoCarousel from "../components/PhotoCarousel";
import PhotoGallery from "../components/PhotoGallery";
import WeddingPartyCarousel from "../components/WeddingPartyCarousel";
import ProgressiveBackground from "../components/ProgressiveBackground";
import hero from "../assets/hero.jpg?w=1920&h=1080&format=webp";
import heroPlaceholder from "../assets/hero.jpg?w=20&h=11&format=webp&blur=5";

const HomePage = () => {
  const weddingDate = new Date("2025-12-06T16:00:00");

  const [isCountdownFinished, setIsCountdownFinished] = useState(
    +weddingDate - +new Date() < 0,
  );

  return (
    <div>
      {/* Hero Photo Section */}
      <ProgressiveBackground
        src={hero}
        placeholder={heroPlaceholder}
        className="relative flex h-[94vh] items-center justify-center bg-cover bg-center md:bg-fixed text-center"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mt-80 animate-fade-in">
          <Heart className="mx-auto mb-6 h-16 w-16 animate-pulse-soft text-white" />
          <h1 className="mb-4 font-script text-4xl text-white md:text-6xl">
            Marco & Lavinia
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">vão se casar!</p>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white">
          <ChevronDown className="h-8 w-8" />
        </div>
      </ProgressiveBackground>

      <section className="relative px-4 pt-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-12">
              Contagem Regressiva para o Grande Dia
            </h2>
            {isCountdownFinished ? (
              <div className="col-span-full">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-wedding-primary mb-4">
                    Estamos Casados! 💕
                  </h3>
                  <p className="text-wedding-dark text-lg">
                    Obrigado por celebrar conosco!
                  </p>
                </div>
              </div>
            ) : (
              <Countdown
                targetDate={weddingDate}
                onComplete={() => setIsCountdownFinished(true)}
              />
            )}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mt-12 shadow-xl animate-slide-up">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="h-8 w-8 text-wedding-primary mb-3" />
                  <h3 className="text-lg font-semibold text-wedding-dark mb-1">
                    Data
                  </h3>
                  <p className="text-wedding-dark">06 de Dezembro, 2025</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-wedding-primary mb-3" />
                  <h3 className="text-lg font-semibold text-wedding-dark mb-1">
                    Horário
                  </h3>
                  <p className="text-wedding-dark">16:00</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-wedding-primary mb-3" />
                  <h3 className="text-lg font-semibold text-wedding-dark mb-1">
                    Local
                  </h3>
                  <p className="text-wedding-dark">Arena Regis Brindes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-4">
              Ensaio Pré-Wedding
            </h2>
            <p className="text-lg text-wedding-dark max-w-2xl mx-auto">
              Dia especial que marcou nossa história de amor
            </p>
          </div>
          <div className="animate-slide-up">
            <PhotoCarousel />
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-4">
              Nossa Galeria de Memórias
            </h2>
            <p className="text-lg text-wedding-dark max-w-2xl mx-auto">
              Uma jornada através dos anos, desde a infância até nos tornarmos o
              casal que somos hoje
            </p>
          </div>
          <div className="animate-slide-up">
            <PhotoGallery />
          </div>
        </div>
      </section>

      {/* Wedding Party Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-4">
              Nossos Padrinhos e Madrinhas
            </h2>
            <p className="text-lg text-wedding-dark max-w-2xl mx-auto">
              As pessoas especiais que escolhemos para estar ao nosso lado neste
              momento único
            </p>
          </div>
          <div className="animate-slide-up">
            <WeddingPartyCarousel />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-8">
            O Grande Dia
          </h2>
          <div className="prose prose-lg mx-auto text-wedding-dark">
            <p className="text-xl leading-relaxed mb-6">
              Queridos amigos e familiares
            </p>
            <p className="text-lg leading-relaxed">
              É uma honra tê-los conosco neste momento especial. Estamos muito
              felizes em compartilhar nossa história com cada um. Espero que
              aproveitem bastante, se divirtam e se emocionem, pois será um
              evento especial, com pessoas especiais. Que Deus abençoe cada um
              de vocês.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
