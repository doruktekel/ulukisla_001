"use client";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WhatsappRefButton = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModelOpen] = useState(false);

  // WhatsApp ikonunun animasyonu
  useGSAP(() => {
    gsap.to(".whatsapp", {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });
  });

  const modalToggle = () => {
    setIsModelOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name.trim()) {
      setError("Lütfen isminizi giriniz");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-ref", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.token);

        // Başarılı durumda WhatsApp'a yönlendirme yapabilirsiniz
        const whatsappUrl = `https://wa.me/?text=${data.token}`;
        window.open(whatsappUrl, "_blank");

        setError(null);
        setName("");
        setIsModelOpen(false);
      } else {
        setError(data.error || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyiniz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={modalToggle} className="cursor-pointer whatsapp">
        <img src="/whatsapp.png" alt="whatsapp" className="w-16 h-16" />
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModelOpen(false);
            }
          }}
        >
          <div className="modal-content bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModelOpen(false);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                İsminizi Yazın
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Whatsapp üzerinden size ulaşabilmemiz için isminizi yazınız
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-700`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsModelOpen(false);
                    setError(null);
                    setName("");
                  }}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-1 px-4 py-3 rounded-lg ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 cursor-pointer"
                  } text-white transition-colors`}
                >
                  {loading ? "Gönderiliyor..." : "Whatsapp'a Geç"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappRefButton;
