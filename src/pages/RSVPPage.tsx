import React, { useState } from 'react';
import { Send, User, Mail, Phone, Heart, Users } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  attendance: string;
  guests: string;
  dietary: string;
  message: string;
}

const RSVPPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.attendance) newErrors.attendance = 'Please let us know if you can attend';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('RSVP submitted:', formData);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <Heart className="h-16 w-16 text-wedding-primary mx-auto mb-6 animate-bounce-gentle" />
            <h2 className="text-3xl font-semibold text-wedding-primary mb-4">
              Obrigado!
            </h2>
            <p className="text-wedding-dark text-lg mb-6">
              Seu RSVP foi recebido. Mal podemos esperar para celebrar com você!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  attendance: '',
                  guests: '1',
                  dietary: '',
                  message: ''
                });
              }}
              className="text-wedding-primary hover:text-wedding-primary/80 underline"
            >
              Enviar outro RSVP
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Send className="h-16 w-16 text-wedding-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-semibold text-wedding-primary mb-4">
            RSVP
          </h1>
          <p className="text-xl text-wedding-dark">
            Por favor, nos informe se você pode se juntar a nós em nosso dia especial!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-slide-up">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-wedding-dark mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-wedding-primary/30 hover:border-wedding-primary/60 focus:border-wedding-primary'
                  } focus:outline-none`}
                  placeholder="Digite seu nome completo"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-wedding-dark mb-2">
                Endereço de Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-wedding-primary/30 hover:border-wedding-primary/60 focus:border-wedding-primary'
                  } focus:outline-none`}
                  placeholder="Digite seu endereço de email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-wedding-dark mb-2">
                Número de Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300"
                  placeholder="Digite seu número de telefone"
                />
              </div>
            </div>

            {/* Attendance Field */}
            <div>
              <label htmlFor="attendance" className="block text-sm font-semibold text-wedding-dark mb-2">
                Você estará presente? *
              </label>
              <select
                id="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                  errors.attendance 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-wedding-primary/30 hover:border-wedding-primary/60 focus:border-wedding-primary'
                } focus:outline-none bg-white`}
              >
                <option value="">Por favor, selecione...</option>
                <option value="yes">Sim, estarei lá! 🎉</option>
                <option value="no">Desculpe, não posso comparecer 😢</option>
              </select>
              {errors.attendance && <p className="text-red-500 text-sm mt-1">{errors.attendance}</p>}
            </div>

            {/* Number of Guests */}
            {formData.attendance === 'yes' && (
              <div>
                <label htmlFor="guests" className="block text-sm font-semibold text-wedding-dark mb-2">
                  Número de Convidados
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300 bg-white"
                  >
                    <option value="1">Apenas eu</option>
                    <option value="2">2 pessoas</option>
                    <option value="3">3 pessoas</option>
                    <option value="4">4 pessoas</option>
                  </select>
                </div>
              </div>
            )}

            {/* Dietary Requirements */}
            {formData.attendance === 'yes' && (
              <div>
                <label htmlFor="dietary" className="block text-sm font-semibold text-wedding-dark mb-2">
                  Restrições Alimentares ou Alergias
                </label>
                <textarea
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Por favor, nos informe sobre quaisquer restrições alimentares ou alergias..."
                />
              </div>
            )}

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-wedding-dark mb-2">
               Mensagem Especial
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300 resize-none"
               placeholder="Compartilhe uma mensagem especial conosco..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-wedding-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-wedding-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Enviar RSVP</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPPage;