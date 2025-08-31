import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import ProgressiveImage from "../components/ProgressiveImage";

import serraDoOuroImg from "../assets/hotels/serra-do-ouro.jpg?w=1024&h=768&format=webp";
import serraDoOuroPlaceholder from "../assets/hotels/serra-do-ouro.jpg?w=20&h=15&format=webp&blur=5";

import fiestaImg from "../assets/hotels/fiesta.jpg?w=1024&h=768&format=webp";
import fiestaPlaceholder from "../assets/hotels/fiesta.jpg?w=20&h=15&format=webp&blur=5";

const LocationPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 pb-12">
      <h1 className="text-4xl text-center mt-10 md:text-4xl font-semibold text-wedding-primary mb-12">
        Localização
      </h1>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-wedding-navy">
          Onde será a celebração?
        </h2>
        <p className="text-lg mb-8 text-wedding-dark">
          A celebração do nosso casamento será realizada em um local especial, a
          Arena Regis Brindes. Prepare-se para um dia inesquecível em Jacobina -
          BA!
        </p>

        {/* Map + Info side by side */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Map (bigger) */}
          <div className="flex-1 w-full h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.002408206344!2d-40.564205124952124!3d-11.18745698898743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76cf568f6309059%3A0x3a0447cfddfaa62f!2sEspa%C3%A7o%2FCampo%20R%C3%A9gis%20Brindes!5e0!3m2!1sen!2sbr!4v1756650245071!5m2!1sen!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Espaço/Campo Régis Brindes Location"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Event Info Card (smaller, centered vertically) */}
          <div className="w-full md:w-1/3 bg-wedding-light p-6 rounded-lg shadow-lg border-2 border-wedding-primary flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6 text-wedding-dark text-center">
              Detalhes do Evento
            </h3>
            <div className="space-y-4 text-wedding-dark">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-wedding-primary" />
                <span className="text-lg">6 de Dezembro</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-wedding-primary" />
                <span className="text-lg">16:00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-wedding-primary" />
                <span className="text-lg">
                  Arena Regis Brindes <br />
                  <span className="text-sm text-gray-600">
                    Via Av. N. Sra. da Conceição, BA-131, Jacobina - BA
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospedagem section unchanged */}
      <section>
        <h2 className="text-3xl font-semibold text-wedding-navy mb-4">
          Opções de Hospedagem
        </h2>
        <p className="text-lg mb-6 text-wedding-dark">
          Para sua comodidade, sugerimos alguns hotéis próximos ao local da
          celebração:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-wedding-secondary mb-2">
              Hotel Serra do Ouro
            </h3>
            <p className="text-wedding-dark mb-2">
              <strong>Endereço:</strong> Largo monte tabor, caixa d'agua S/N,
              Jacobina, CEP 44700-000, Brasil
            </p>
            <p className="text-wedding-dark mb-4">
              <strong>Diária:</strong> R$ 310,00 (Booking.com)
            </p>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              <ProgressiveImage
                src={serraDoOuroImg}
                placeholder={serraDoOuroPlaceholder}
                alt="Hotel Serra do Ouro"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl text-wedding-secondary font-bold mb-2">
              Fiesta
            </h3>
            <p className="text-wedding-dark mb-2">
              <strong>Endereço:</strong> Av. Paulo Souto, 700, Jacobina, CEP
              44700-000, Brasil
            </p>
            <p className="text-wedding-dark mb-4">
              <strong>Diária:</strong> R$ 343,00 (Booking.com)
            </p>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              <ProgressiveImage
                src={fiestaImg}
                placeholder={fiestaPlaceholder}
                alt="Hotel Fiesta"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
