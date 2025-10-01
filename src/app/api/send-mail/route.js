import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const formatName = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export async function POST(req) {
  try {
    const {
      name: rawName,
      surname: rawSurname,
      phone,
      email,
      apartmentType,
      acceptKvkk,
      referans,
    } = await req.json();

    const name = formatName(rawName);
    const surname = formatName(rawSurname);
    // Input validation
    const errors = {};
    if (!name) errors.name = "Ad alanı zorunludur";
    if (!surname) errors.surname = "Soyad alanı zorunludur";
    if (!phone) errors.phone = "Telefon alanı zorunludur";
    if (!email) errors.email = "E-posta alanı zorunludur";
    if (!apartmentType) errors.apartmentType = "Apartman tipi alanı zorunludur";

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = "Geçerli bir telefon numarası giriniz";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // ENV kontrolü - Eğer yoksa hata ver
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ SMTP env değerleri bulunamadı!");
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    console.log("🔧 SMTP Ayarları:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS,
    });

    // Gmail için özel SMTP yapılandırması
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Gmail App Password olmalı
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
        ciphers: "SSLv3",
      },
      connectionTimeout: 20000, // 20 saniye
      greetingTimeout: 20000,
      socketTimeout: 20000,
      logger: true, // Debug için
      debug: true, // Debug için
    });

    // SMTP bağlantısını test et
    console.log("🔍 SMTP bağlantısı test ediliyor...");
    try {
      await transporter.verify();
      console.log("✅ SMTP bağlantısı başarılı");
    } catch (verifyError) {
      console.error("❌ SMTP verify hatası:", verifyError);
      return NextResponse.json(
        {
          error: "Mail sunucusuna bağlanılamadı",
          details:
            process.env.NODE_ENV === "development"
              ? verifyError.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // Referans satırı oluştur
    const referansRow = referans
      ? `<tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Kök Referansı</td>
          <td style="padding: 10px; background: #fff;">${referans}</td>
        </tr>`
      : "";

    const kvkkStatus = acceptKvkk ? "✅ Onaylandı" : "❌ Onaylanmadı";
    const kvkkColor = acceptKvkk ? "#2e7d32" : "#b91c1c";

    const kvkkText = `Değerli Kullanıcı,
6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, bu formda paylaşmış olduğunuz ad, soyad, e-posta, telefon ve hisse talep bilgileri ile sizi sitemize yönlendiren kişiye ait referans bilgisi, şirketimiz tarafından tarafınızla iletişim kurmak, talebinizi değerlendirmek, size hizmet sunmak ve referans takibi yapmak amacıyla işlenecektir.
Kişisel verileriniz, tamamen kendi iradenizle ve açık rızanızla tarafımıza iletilmektedir. Bu veriler, belirtilen amaçlar dışında kullanılmayacak olup, ilgili yasal yükümlülükler haricinde üçüncü kişilerle paylaşılmayacaktır.`;

    const mailData = {
      from: `"Hisse Talebi" <${process.env.SMTP_USER}>`,
      to: "talep@kaledranresort.com", // PHP'deki gibi
      replyTo: `"${name} ${surname}" <${email}>`,
      subject: `${name} ${surname} - Konut Pay Edinim Talebi`,
      html: `
<!doctype html>
<html lang='tr'>
<head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>
<body style='margin:0;background:#fff;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2937;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background:#fff;padding:24px 0;'>
    <tr>
      <td align='center'>
        <table role='presentation' width='620' cellpadding='0' cellspacing='0' style='background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.06);'>
          <tr>
            <td style='padding:24px 28px 8px 28px;'>
              <h1 style='margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#0f47c1;'>Ulukışla - ESYK</h1>
            </td>
          </tr>
          <tr>
            <td style='padding:0 28px 8px 28px;'>
              <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:separate;border-spacing:0;'>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;width:38%;font-weight:600;font-size:13px;color:#374151;'>Ad Soyad:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;color:#111827;'>${name} ${surname}</td>
                </tr>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>E-posta:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;'>
                    <a href='mailto:${email}' style='color:#0f47c1;text-decoration:none;'>${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>Telefon:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;'>
                    <a href='tel:${phone}' style='color:#0f47c1;text-decoration:none;'>${phone}</a>
                  </td>
                </tr>
                ${referansRow}
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>Seçilen Konut Tipi:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;color:#111827;'>${apartmentType}</td>
                </tr>
                <tr>
                  <td style='background:#f3f4f6;padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#374151;'>Aydınlatma Metni Onayı:</td>
                  <td style='padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;'>
                    <span style='font-weight:700;color:${kvkkColor};'>${kvkkStatus}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style='padding:10px 28px 0 28px;'>
              <img src='https://ulukisla-001.vercel.app/logo.webp' alt='UlukışlaLogo' width='140' style='display:block;margin:0 auto' />
            </td>
          </tr>
          <tr>
            <td style='padding:10px 28px 0 28px;'>
              <div style='font-size:11px;color:#6b7280;text-align:center;'>Bu e-posta, web sitesindeki kooperatif payı talep formundan otomatik gelmiştir.</div>
            </td>
          </tr>
          <tr>
            <td style='padding:10px 28px 22px 28px;'>
              <div style='border-top:1px solid #e5e7eb;padding-top:12px;'>
                <div style='font-size:11px;color:#6b7280;line-height:1.5;'>
                  <strong>Kullanıcının Onayladığı Aydınlatma Metni:</strong><br>
                  ${kvkkText.replace(/\n/g, "<br>")}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `Yeni Hisse Talep Formu\n\nAd Soyad: ${name} ${surname}\nE-posta: ${email}\nTelefon: ${phone}${
        referans ? `\nKök Referansı: ${referans}` : ""
      }\nSeçilen Konut Tipi: ${apartmentType}\nAydınlatma Metni Onayı: ${kvkkStatus}\n\n${kvkkText}`,
    };

    // Mail gönder
    console.log("📧 Mail gönderiliyor...");
    await transporter.sendMail(mailData);
    console.log("✅ Mail başarıyla gönderildi");

    return NextResponse.json(
      { message: "Form başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Form gönderimi hatası:", error);

    return NextResponse.json(
      {
        error: "Form gönderilirken bir hata oluştu",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Lütfen daha sonra tekrar deneyin",
      },
      { status: 500 }
    );
  }
}
