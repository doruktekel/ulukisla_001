import { useState } from "react";

const useWhatsappRef = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const whatsappRef = async (name) => {
    if (!name.trim()) {
      setError("Lütfen isminizi giriniz");
      return;
    }

    setLoading(true);
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
        const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/slide/${data.token}`;
        const messageWithUrl = `Sayın ${name}, merhabalar sizlere Ulukışla Anadolu Yapı Kooperatifi'nin fırsatlarla dolu portföyünü iletmekten mutluluk duyarım.\n\n\n${targetUrl}`;

        // Mobil cihaz kontrolü
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        let whatsappUrl;
        if (isMobile) {
          // Mobil için whatsapp:// protokolü - kişi listesi gösterir
          whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
            messageWithUrl
          )}`;
        } else {
          // Masaüstü için wa.me
          whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
            messageWithUrl
          )}`;
        }

        window.open(whatsappUrl, "_blank");

        setError(null);
      } else {
        setError(data.error || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyiniz");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, whatsappRef };
};

export default useWhatsappRef;
