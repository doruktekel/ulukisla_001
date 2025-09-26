"use client";
import { useState, useRef, useEffect } from "react";

const KvkkModal = ({ isOpen, onClose, onAccept }) => {
  const [canAccept, setCanAccept] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Check if scrolled to bottom (with a small threshold)
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
      setCanAccept(isAtBottom);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCanAccept(false);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[60vh] md:max-h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center">
            KVKK Aydınlatma Metni
          </h2>
        </div>

        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="p-4 overflow-y-auto flex-1"
        >
          <div className="prose prose-sm">
            <h3>
              Kişisel Verilerin Korunması ve İşlenmesi Hakkında Aydınlatma Metni
            </h3>
            <p>
              Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
              uyarınca hazırlanmıştır.
            </p>

            <h4>1. Veri Sorumlusu</h4>
            <p>
              Şirketimiz, kişisel verilerinizin işlenmesi konusunda veri
              sorumlusu sıfatıyla hareket etmektedir.
            </p>

            <h4>2. Kişisel Verilerin İşlenme Amaçları</h4>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Talep ve şikayetlerin takibi</li>
              <li>Hizmet kalitesinin iyileştirilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>

            <h4>3. Kişisel Verilerin Aktarılması</h4>
            <p>
              Kişisel verileriniz, yukarıda belirtilen amaçların
              gerçekleştirilmesi için gerekli olduğu ölçüde ve ilgili mevzuat
              hükümleri çerçevesinde yetkili kamu kurum ve kuruluşları ile
              paylaşılabilecektir.
            </p>

            <h4>4. Kişisel Veri Toplama Yöntemi ve Hukuki Sebebi</h4>
            <p>
              Kişisel verileriniz, elektronik ortamda web sitemiz üzerinden veya
              fiziki ortamda toplanmaktadır.
            </p>

            <h4>5. KVKK Kapsamındaki Haklarınız</h4>
            <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
              </li>
              <li>
                Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
                kullanılıp kullanılmadığını öğrenme
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
                üçüncü kişileri bilme
              </li>
              <li>
                Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde
                bunların düzeltilmesini isteme
              </li>
            </ul>

            <h4>6. İletişim</h4>
            <p>
              Bu aydınlatma metni kapsamında yer alan hususlara ilişkin detaylı
              bilgi için bizimle iletişime geçebilirsiniz.
            </p>

            <div className="h-10"></div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Kapat
          </button>
          <button
            onClick={onAccept}
            disabled={!canAccept}
            className={`px-4 py-2 rounded cursor-pointer ${
              canAccept
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Kabul Ediyorum
          </button>
        </div>
      </div>
    </div>
  );
};

export default KvkkModal;
