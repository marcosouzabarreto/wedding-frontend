import React, { useState, useEffect } from "react";
import {
  Send,
  Mail,
  Phone,
  Heart,
  Users,
  Key,
  Check,
  Loader2,
} from "lucide-react";
import { Family, FamilyMember, FamilyRSVPRequest } from "../types/family";
import { getFamilyByToken, submitRsvp } from "../services/rsvpService";
import { AxiosError } from "axios";

interface RSVPFormData {
  email: string;
  phone: string;
  message: string;
}

const RSVPPage = () => {
  const [step, setStep] = useState<"token" | "selection" | "details">("token");
  const [familyToken, setFamilyToken] = useState("");
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<FamilyMember[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  console.log({ currentFamily });

  useEffect(() => {
    if (currentFamily) {
      const familyGuests = Array.isArray(currentFamily.guests)
        ? currentFamily.guests
        : [];

      const existingAttendees = familyGuests.filter(
        (member) => member.rsvp?.willAttend === true,
      );
      const hasExistingRSVP =
        existingAttendees.length > 0 || !!currentFamily.email;

      if (hasExistingRSVP) {
        setIsUpdating(true);
        setSelectedGuests(
          existingAttendees.map((member) => ({
            ...member,
            dietaryRestrictions: member.rsvp?.dietaryRestrictions || "",
          })),
        );
        setFormData({
          email: currentFamily.email || "",
          phone: currentFamily.phone || "",
          message: currentFamily.guests[0]?.rsvp?.message || "",
        });
      } else {
        setIsUpdating(false);
        setSelectedGuests([]);
        setFormData({ email: "", phone: "", message: "" });
      }
    }
  }, [currentFamily]);

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyToken) {
      setTokenError("Por favor, insira um token.");
      return;
    }
    setIsVerifyingToken(true);
    setTokenError("");
    try {
      const family = await getFamilyByToken(familyToken.trim());
      setCurrentFamily(family);
      setStep("selection");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setTokenError(
          "Token da família inválido. Por favor, verifique e tente novamente.",
        );
      } else {
        setTokenError(
          "Ocorreu um erro ao verificar o token. Tente novamente mais tarde.",
        );
      }
      console.error(error);
    } finally {
      setIsVerifyingToken(false);
    }
  };

  const handleMemberToggle = (member: FamilyMember) => {
    setSelectedGuests((prev) => {
      const isSelected = prev.some((m) => m.id === member.id);
      if (isSelected) {
        return prev.filter((m) => m.id !== member.id);
      } else {
        const originalMember = currentFamily?.guests.find(
          (m) => m.id === member.id,
        );
        return [
          ...prev,
          {
            ...member,
            rsvp: {
              ...member.rsvp,
              willAttend: true,
              dietaryRestrictions:
                originalMember?.rsvp?.dietaryRestrictions || "",
            },
          },
        ];
      }
    });
  };

  const updateMemberDietaryRestrictions = (
    memberId: string,
    dietary: string,
  ) => {
    setSelectedGuests((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              rsvp: {
                ...(member.rsvp ?? {
                  id: memberId,
                  willAttend: false,
                }),
                dietaryRestrictions: dietary,
              },
            }
          : member,
      ),
    );
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Por favor, insira um email válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !currentFamily) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const rsvpData: FamilyRSVPRequest = {
      familyToken: currentFamily.token,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      guests: (currentFamily.guests || []).map((member) => {
        const selected = selectedGuests.find((m) => m.id === member.id);
        return {
          guestId: member.id,
          willAttend: !!selected,
          dietaryRestrictions: selected?.rsvp?.dietaryRestrictions || "",
        };
      }),
    };

    try {
      await submitRsvp(rsvpData);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(
        "Houve um erro ao enviar seu RSVP. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep("token");
    setFamilyToken("");
    setTokenError("");
    setCurrentFamily(null);
    setSelectedGuests([]);
    setIsUpdating(false);
    setFormData({ email: "", phone: "", message: "" });
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  if (submitted) {
    return (
      <div className="py-16 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <Heart className="h-16 w-16 text-wedding-primary mx-auto mb-6 animate-bounce-gentle" />
            <h2 className="text-3xl font-semibold text-wedding-primary mb-4">
              {isUpdating ? "RSVP Atualizado!" : "Obrigado!"}
            </h2>
            <p className="text-wedding-dark text-lg mb-6">
              Seu RSVP foi {isUpdating ? "atualizado" : "recebido"} para a
              família {currentFamily?.familyName}. Mal podemos esperar para
              celebrar com vocês!
            </p>
            <div className="text-sm text-wedding-dark mb-6">
              <p className="font-semibold mb-2">Confirmados:</p>
              {selectedGuests.length > 0 ? (
                selectedGuests.map((member) => (
                  <p
                    key={member.id}
                    className="flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {member.name} {member.familyName}
                  </p>
                ))
              ) : (
                <p>Nenhum convidado confirmado.</p>
              )}
            </div>
            <button
              onClick={resetForm}
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
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Send className="h-16 w-16 text-wedding-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-semibold text-wedding-primary mb-4">
            RSVP
          </h1>
          <p className="text-xl text-wedding-dark">
            Por favor, nos informe se você pode se juntar a nós em nosso dia
            especial!
          </p>
        </div>

        {step === "token" && (
          <form
            onSubmit={handleTokenSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-slide-up"
          >
            <div className="text-center mb-8">
              <Key className="h-12 w-12 text-wedding-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-wedding-primary mb-2">
                Token da Família
              </h2>
              <p className="text-wedding-dark">
                Digite o token da sua família que foi enviado no convite
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="familyToken"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Token da Família *
                </label>
                <input
                  type="text"
                  id="familyToken"
                  value={familyToken}
                  onChange={(e) => {
                    setFamilyToken(e.target.value.toUpperCase());
                    setTokenError("");
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-center text-lg font-mono transition-all duration-300 ${
                    tokenError
                      ? "border-red-400 focus:border-red-400"
                      : "border-wedding-primary/30 hover:border-wedding-primary/60 focus:border-wedding-primary"
                  } focus:outline-none`}
                  placeholder="Ex: BARRETO2025"
                  disabled={isVerifyingToken}
                />
                {tokenError && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {tokenError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-wedding-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-wedding-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70"
                disabled={isVerifyingToken}
              >
                {isVerifyingToken ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Verificando...
                  </>
                ) : (
                  "Verificar Token"
                )}
              </button>
            </div>
          </form>
        )}

        {step === "selection" && currentFamily && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-slide-up">
            <div className="text-center mb-8">
              <Users className="h-12 w-12 text-wedding-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-wedding-primary mb-2">
                Família {currentFamily.familyName}
                {isUpdating && (
                  <span className="block text-sm text-wedding-accent mt-1">
                    (Atualizando RSVP existente)
                  </span>
                )}
              </h2>
              <p className="text-wedding-dark">
                {isUpdating ? "Atualize" : "Selecione"} os membros da família
                que estarão presentes
              </p>
            </div>
            <div className="space-y-4 mb-8">
              {(currentFamily.guests || []).map((member) => {
                const isSelected = selectedGuests.some(
                  (m) => m.id === member.id,
                );
                const selectedMember = selectedGuests.find(
                  (m) => m.id === member.id,
                );
                return (
                  <div
                    key={member.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-wedding-primary bg-wedding-secondary/20"
                        : "border-wedding-primary/30 hover:border-wedding-primary/60"
                    }`}
                    onClick={() => handleMemberToggle(member)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? "border-wedding-primary bg-wedding-primary"
                              : "border-wedding-primary/30"
                          }`}
                        >
                          {isSelected && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-wedding-dark">
                            {member.name} {member.familyName}
                          </p>
                          {member.isMainContact && (
                            <p className="text-sm text-wedding-primary">
                              Contato principal
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-wedding-primary/20">
                        <label className="block text-sm font-semibold text-wedding-dark mb-2">
                          Restrições Alimentares (opcional)
                        </label>
                        <input
                          type="text"
                          value={
                            selectedMember?.rsvp?.dietaryRestrictions || ""
                          }
                          onChange={(e) => {
                            updateMemberDietaryRestrictions(
                              member.id,
                              e.target.value,
                            );
                          }}
                          className="w-full px-3 py-2 border border-wedding-primary/30 rounded-lg focus:border-wedding-primary focus:outline-none"
                          placeholder="Ex: Vegetariano, alergia a nozes..."
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {errors.guests && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {errors.guests}
              </p>
            )}
            <div className="flex space-x-4">
              <button
                onClick={() => setStep("token")}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  setStep("details");
                }}
                className="flex-1 bg-wedding-primary text-white py-3 rounded-xl font-semibold hover:bg-wedding-primary/90 transition-all duration-300"
              >
                Continuar ({selectedGuests.length} selecionados)
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <form
            onSubmit={handleFinalSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-slide-up"
          >
            <div className="text-center mb-8">
              <Mail className="h-12 w-12 text-wedding-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-wedding-primary mb-2">
                Informações de Contato
              </h2>
              <p className="text-wedding-dark">
                {isUpdating ? "Atualize suas" : "Finalize seu RSVP com suas"}{" "}
                informações de contato
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-wedding-secondary/20 rounded-xl p-4">
                <h3 className="font-semibold text-wedding-dark mb-2">
                  Confirmados:
                </h3>
                <div className="space-y-1">
                  {selectedGuests.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>
                        {member.name} {member.familyName}
                      </span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Endereço de Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                      errors.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-wedding-primary/30 hover:border-wedding-primary/60 focus:border-wedding-primary"
                    } focus:outline-none`}
                    placeholder="Digite seu endereço de email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Número de Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300"
                    placeholder="Digite seu número de telefone"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Mensagem Especial
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Compartilhe uma mensagem especial conosco..."
                />
              </div>
              {submitError && (
                <div className="text-red-500 text-sm text-center p-3 bg-red-100 rounded-lg">
                  {submitError}
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep("selection")}
                  className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-wedding-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-wedding-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{isUpdating ? "Atualizar" : "Enviar"} RSVP</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RSVPPage;
