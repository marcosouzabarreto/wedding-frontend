import { useState } from "react";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import Countdown from "../components/Countdown";
import PhotoCarousel from "../components/PhotoCarousel";

const HomePage = () => {
  const weddingDate = new Date("2025-12-06T16:00:00");

  const [isCountdownFinished, setIsCountdownFinished] = useState(
    +weddingDate - +new Date() < 0,
  );

  return (
    <div className="min-h-screen">
      {/* Hero Photo Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <img
              src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Marco & Lavinia"
              className="w-full max-w-2xl mx-auto h-64 md:h-80 object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Heart className="h-16 w-16 text-wedding-primary mx-auto mb-6 animate-pulse-soft" />
            <h1 className="font-script text-5xl md:text-7xl text-wedding-primary mb-4">
              Marco & Lavinia
            </h1>
            <p className="text-xl md:text-2xl text-wedding-dark mb-8">
              vão se casar!
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl animate-slide-up">
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
          </div>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-4">
              Nossa Jornada Juntos
            </h2>
            <p className="text-lg text-wedding-dark max-w-2xl mx-auto">
              Momentos especiais que marcaram nossa história de amor
            </p>
          </div>
          <div className="animate-slide-up">
            <PhotoCarousel />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-wedding-primary mb-8">
            Nossa História de Amor
          </h2>
          <div className="prose prose-lg mx-auto text-wedding-dark">
            <p className="text-lg leading-relaxed mb-6">
              Desde o momento em que nos conhecemos naquela cafeteria
              aconchegante há três anos, soubemos que algo especial estava
              começando. Através de aventuras, risadas e inúmeros sonhos
              compartilhados, nosso amor cresceu mais forte a cada dia.
            </p>
            <p className="text-lg leading-relaxed">
              Agora, estamos animados para dar o próximo passo em nossa jornada
              juntos, cercados pelo amor e apoio de nossa família e amigos.
              Junte-se a nós enquanto dizemos "Sim" e começamos nossa maior
              aventura!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
