import { useState, useEffect, useMemo } from "react";
import {
  Gift,
  Check,
  User,
  MessageSquare,
  Loader2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { getGifts, createPreference } from "../services/giftService";

interface GiftItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  selected: boolean;
}

const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (publicKey) {
  initMercadoPago(publicKey);
}

const GiftSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const GiftPage = () => {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCustom, setSelectedCustom] = useState(false);
  const [giftPersonalization, setGiftPersonalization] = useState({
    name: "",
    message: "",
  });
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const giftsPerPage = 8;

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const data = await getGifts();
        setGifts(
          data.map((gift: GiftItem) => ({
            ...gift,
            id: gift.id,
            selected: false,
          })),
        );
      } catch (error) {
        console.error("Error fetching gifts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  const handleGiftSelect = (id: string) => {
    setGifts(
      gifts.map((gift) =>
        gift.id === id ? { ...gift, selected: !gift.selected } : gift,
      ),
    );
    setSelectedCustom(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedCustom(true);
      setGifts(gifts.map((gift) => ({ ...gift, selected: false })));
    } else {
      setSelectedCustom(false);
    }
  };

  const getTotalAmount = () => {
    if (selectedCustom && customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return gifts
      .filter((gift) => gift.selected)
      .reduce((total, gift) => total + gift.price, 0);
  };

  const handleCheckout = async () => {
    const selectedGifts = gifts.filter((gift) => gift.selected);
    if (selectedGifts.length === 0 && !customAmount) {
      alert("Por favor, selecione ao menos um presente.");
      return;
    }

    setCheckoutLoading(true);

    const payload = {
      gift_ids: selectedGifts.map((gift) => gift.id),
      custom_amount: customAmount ? parseFloat(customAmount) : undefined,
      gifter_name: giftPersonalization.name,
      message: giftPersonalization.message,
    };

    try {
      const data = await createPreference(payload);
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error("Error creating preference:", error);
      alert(
        "Ocorreu um erro ao iniciar o pagamento. Por favor, tente novamente.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const sortedGifts = useMemo(() => {
    return [...gifts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [gifts, sortOrder]);

  const paginatedGifts = useMemo(() => {
    const startIndex = (currentPage - 1) * giftsPerPage;
    return sortedGifts.slice(startIndex, startIndex + giftsPerPage);
  }, [sortedGifts, currentPage]);

  const totalPages = Math.ceil(sortedGifts.length / giftsPerPage);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Gift className="h-16 w-16 text-wedding-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-semibold text-wedding-primary mb-4">
            Lista de Presentes
          </h1>
          <p className="text-xl text-wedding-dark max-w-2xl mx-auto">
            Sua presença é o maior presente, mas se você gostaria de nos ajudar
            a começar nossa nova vida juntos, aqui estão alguns itens que
            adoraríamos ter.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl animate-slide-up">
          <h2 className="text-2xl font-semibold text-wedding-primary mb-6 text-center">
            Contribuir com Valor Personalizado
          </h2>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary font-semibold">
                R$
              </span>
              <input
                type="number"
                placeholder="Digite o valor"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 ${
                  selectedCustom
                    ? "border-wedding-primary bg-wedding-secondary/50"
                    : "border-wedding-primary/30 hover:border-wedding-primary/60"
                } focus:outline-none focus:border-wedding-primary`}
              />
              {selectedCustom && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-md text-wedding-primary hover:bg-wedding-primary/10 transition-all duration-300"
          >
            <ArrowUpDown className="h-5 w-5 mr-2" />
            <span>
              {sortOrder === "asc"
                ? "Ordenar por Preço (Menor para Maior)"
                : "Ordenar por Preço (Maior para Menor)"}
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 animate-slide-up">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <GiftSkeleton key={index} />
              ))
            : paginatedGifts.map((gift) => (
                <div
                  key={gift.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                    gift.selected ? "ring-4 ring-wedding-primary scale-105" : ""
                  }`}
                  onClick={() => handleGiftSelect(gift.id)}
                >
                  <div className="relative">
                    <img
                      src={gift.imageUrl}
                      alt={gift.name}
                      className="w-full h-48 object-cover"
                    />
                    {gift.selected && (
                      <div className="absolute inset-0 bg-wedding-primary/20 flex items-center justify-center">
                        <div className="bg-wedding-primary rounded-full p-3">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-wedding-dark mb-2">
                      {gift.name}
                    </h3>
                    <p className="text-2xl font-bold text-wedding-primary">
                      R$ {gift.price}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-wedding-primary hover:bg-wedding-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-lg font-semibold text-wedding-primary">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-wedding-primary hover:bg-wedding-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {(gifts.some((gift) => gift.selected) || selectedCustom) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 my-8 shadow-xl animate-slide-up">
            <h3 className="text-2xl font-semibold text-wedding-primary mb-6 text-center">
              Personalizar Presente (Opcional)
            </h3>
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label
                  htmlFor="gift-name"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Seu Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-primary h-5 w-5" />
                  <input
                    type="text"
                    id="gift-name"
                    value={giftPersonalization.name}
                    onChange={(e) =>
                      setGiftPersonalization((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300"
                    placeholder="Digite seu nome"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="gift-message"
                  className="block text-sm font-semibold text-wedding-dark mb-2"
                >
                  Mensagem Especial
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-wedding-primary h-5 w-5" />
                  <textarea
                    id="gift-message"
                    value={giftPersonalization.message}
                    onChange={(e) =>
                      setGiftPersonalization((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border-2 border-wedding-primary/30 rounded-xl hover:border-wedding-primary/60 focus:border-wedding-primary focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Escreva uma mensagem carinhosa para os noivos..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {(gifts.some((gift) => gift.selected) || selectedCustom) && (
          <div className="bg-wedding-primary/10 backdrop-blur-sm rounded-3xl p-8 text-center animate-slide-up">
            <h3 className="text-2xl font-semibold text-wedding-primary mb-4">
              Resumo do Presente
            </h3>
            <div className="text-3xl font-bold text-wedding-primary mb-6">
              Total: R$ {getTotalAmount()}
            </div>
            {!preferenceId ? (
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="bg-wedding-primary text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-wedding-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    <span>Processando...</span>
                  </div>
                ) : (
                  "Finalizar Presente"
                )}
              </button>
            ) : (
              <Wallet initialization={{ preferenceId }} />
            )}
            <p className="text-sm text-wedding-dark mt-4">
              Você será redirecionado para nosso processador de pagamento seguro
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftPage;
