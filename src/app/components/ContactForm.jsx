"use client";
import { useState } from "react";
import KvkkModal from "./KvkkModal";

const ContactForm = () => {
  const [isKvkkModalOpen, setIsKvkkModalOpen] = useState(false);
  const [hasReadKvkk, setHasReadKvkk] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    apartmentType: "",
    acceptKvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ad alanı zorunludur";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Soyad alanı zorunludur";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.apartmentType) {
      newErrors.apartmentType = "Daire tipi seçimi zorunludur";
    }

    if (!formData.acceptKvkk) {
      newErrors.acceptKvkk = "KVKK metnini kabul etmeniz gerekmektedir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setErrors({});
        setFormData({
          name: "",
          surname: "",
          phone: "",
          email: "",
          apartmentType: "",
          acceptKvkk: false,
        });
      } else {
        // Handle validation errors from backend
        if (response.status === 400 && data.errors) {
          setErrors(data.errors);
          setSubmitStatus(null);
        } else {
          setSubmitStatus("error");
          setErrors({});
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for KVKK checkbox
    if (name === "acceptKvkk") {
      if (checked && !hasReadKvkk) {
        // If trying to check without reading
        setIsKvkkModalOpen(true);
        return; // Don't update the checkbox yet
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        İletişim Formu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Adınız"
            className={`w-full p-3 rounded-lg bg-white/20 border ${
              errors.name ? "border-red-500" : "border-transparent"
            } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Soyadınız"
            className={`w-full p-3 rounded-lg bg-white/20 border ${
              errors.surname ? "border-red-500" : "border-transparent"
            } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50`}
          />
          {errors.surname && (
            <p className="text-red-400 text-sm mt-1">{errors.surname}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon Numaranız"
            className={`w-full p-3 rounded-lg bg-white/20 border ${
              errors.phone ? "border-red-500" : "border-transparent"
            } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50`}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta Adresiniz"
            className={`w-full p-3 rounded-lg bg-white/20 border ${
              errors.email ? "border-red-500" : "border-transparent"
            } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <select
            name="apartmentType"
            value={formData.apartmentType}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-white/20 border ${
              errors.apartmentType ? "border-red-500" : "border-transparent"
            } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50`}
          >
            <option value="" className="text-gray-900">
              Daire Tipi Seçiniz
            </option>
            <option value="2+1" className="text-gray-900">
              2+1
            </option>
            <option value="3+1" className="text-gray-900">
              3+1
            </option>
            <option value="4+1" className="text-gray-900">
              4+1
            </option>
          </select>
          {errors.apartmentType && (
            <p className="text-red-400 text-sm mt-1">{errors.apartmentType}</p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="acceptKvkk"
            checked={formData.acceptKvkk}
            onChange={handleChange}
            className="mt-1"
            id="acceptKvkk"
          />
          <label
            className="text-sm text-white select-none cursor-pointer font-semibold underline underline-offset-4 hover:text-blue-300 transition-colors duration-300 ease-in-out"
            htmlFor="acceptKvkk"
            onClick={(e) => {
              e.preventDefault();
              setIsKvkkModalOpen(true);
            }}
          >
            KVKK metnini okudum ve kabul ediyorum.
          </label>
        </div>
        {errors.acceptKvkk && (
          <p className="text-red-400 text-sm">{errors.acceptKvkk}</p>
        )}

        <KvkkModal
          isOpen={isKvkkModalOpen}
          onClose={() => setIsKvkkModalOpen(false)}
          onAccept={() => {
            setHasReadKvkk(true);
            setFormData((prev) => ({ ...prev, acceptKvkk: true }));
            setIsKvkkModalOpen(false);
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg cursor-pointer hover:bg-gray-300 bg-white text-black font-semibold transition-all duration-300 ease-in-out
            ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-opacity-90"
            }`}
        >
          {isSubmitting ? "Gönderiliyor..." : "Talep Gönder"}
        </button>

        {submitStatus === "success" && (
          <p className="text-green-400 text-center">
            Form başarıyla gönderildi!
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-400 text-center">
            Bir hata oluştu. Lütfen tekrar deneyiniz.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
