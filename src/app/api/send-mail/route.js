// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     // Get form data from request
//     const { name, surname, phone, email, apartmentType } = await req.json();

//     // Input validation
//     const errors = {};

//     if (!name) errors.name = "Ad alanı zorunludur";
//     if (!surname) errors.surname = "Soyad alanı zorunludur";
//     if (!phone) errors.phone = "Telefon alanı zorunludur";
//     if (!email) errors.email = "E-posta alanı zorunludur";
//     if (!apartmentType) errors.apartmentType = "Apartman tipi alanı zorunludur";

//     // Email format validation
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     if (email && !emailRegex.test(email)) {
//       errors.email = "Geçerli bir e-posta adresi giriniz";
//     }

//     // Phone number validation (10 digits)
//     const phoneRegex = /^[0-9]{10}$/;
//     if (phone && !phoneRegex.test(phone)) {
//       errors.phone = "Geçerli bir telefon numarası giriniz";
//     }

//     // If there are any validation errors, return them
//     if (Object.keys(errors).length > 0) {
//       return NextResponse.json({ errors }, { status: 400 });
//     }

//     console.log("SMTP Config:", {
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       user: process.env.SMTP_USER,
//       hasPassword: !!process.env.SMTP_PASS,
//     });

//     const smtpPort = parseInt(process.env.SMTP_PORT || "465");

//     // Configure email transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: smtpPort,
//       secure: smtpPort === 465, //  true, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//       // Timeout ayarları - Vercel için önemli
//       connectionTimeout: 10000,
//       greetingTimeout: 10000,
//       socketTimeout: 10000,
//     });

//     // SMTP bağlantısını test et
//     console.log("SMTP bağlantısı test ediliyor...");
//     try {
//       await transporter.verify();
//       console.log("✅ SMTP bağlantısı başarılı");
//     } catch (verifyError) {
//       console.error("❌ SMTP verify hatası:", verifyError.message);
//       throw new Error(`SMTP bağlantı hatası: ${verifyError.message}`);
//     }

//     const mailData = {
//       from: process.env.SMTP_USER,
//       to: process.env.SMTP_USER,
//       subject: "Yeni İletişim Formu Başvurusu",
//       html: `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
//       <h1 style="color: #333; text-align: center;">📩 Yeni Form Başvurusu</h1>
//       <p style="color: #555; font-size: 15px; text-align: center;">Aşağıda kullanıcı bilgilerini bulabilirsiniz:</p>

//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1; width: 35%;">Ad</td>
//           <td style="padding: 10px; background: #fff;">${name}</td>
//         </tr>
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Soyad</td>
//           <td style="padding: 10px; background: #fff;">${surname}</td>
//         </tr>
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Telefon</td>
//           <td style="padding: 10px; background: #fff;">${phone}</td>
//         </tr>
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">E-posta</td>
//           <td style="padding: 10px; background: #fff;">${email}</td>
//         </tr>
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Apartman Tipi</td>
//           <td style="padding: 10px; background: #fff;">${apartmentType}</td>
//         </tr>
//         <tr>
//           <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Gönderilme Tarihi</td>
//           <td style="padding: 10px; background: #fff;">${new Date().toLocaleString(
//             "tr-TR"
//           )}</td>
//         </tr>
//       </table>

//       <p style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
//         Bu mail otomatik olarak gönderilmiştir. Yanıtlamayın.
//       </p>
//     </div>
//   `,
//     };

//     // Send email
//     await transporter.sendMail(mailData);

//     // Return success response
//     return NextResponse.json(
//       { message: "Form başarıyla gönderildi" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Form gönderimi sırasında hata:", error);

//     // Return error response
//     return NextResponse.json(
//       { error: "Form gönderilirken bir hata oluştu" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      name,
      surname,
      phone,
      email,
      apartmentType,
      kvkkConsent,
      referans,
    } = await req.json();

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

    // SMTP Configuration - PHP kodunuza benzer şekilde
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // SSL için true olmalı
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // PHP kodundaki gibi güvenlik ayarları
      tls: {
        rejectUnauthorized: false, // Self-signed certificate kabul et
        minVersion: "TLSv1.2",
      },
      // Vercel için timeout ayarları
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      pool: true, // Bağlantı havuzu kullan
      maxConnections: 1,
      maxMessages: 3,
    });

    // Referans satırı oluştur
    const referansRow = referans
      ? `<tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Kök Referansı</td>
          <td style="padding: 10px; background: #fff;">${referans}</td>
        </tr>`
      : "";

    const kvkkStatus = kvkkConsent ? "✅ Onaylandı" : "❌ Onaylanmadı";
    const kvkkColor = kvkkConsent ? "#2e7d32" : "#b91c1c";

    const mailData = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      replyTo: email, // PHP kodundaki addReplyTo gibi
      subject: `${name} ${surname} - Konut Pay Edinim Talebi`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px; background-color: #ffffff;">
      <h1 style="color: #0f47c1; margin: 0 0 20px 0; font-size: 22px;">Ulukışla - ESYK</h1>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6; width: 38%;">Ad Soyad</td>
          <td style="padding: 10px; background: #fff;">${name} ${surname}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">E-posta</td>
          <td style="padding: 10px; background: #fff;"><a href="mailto:${email}" style="color: #0f47c1;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Telefon</td>
          <td style="padding: 10px; background: #fff;"><a href="tel:${phone}" style="color: #0f47c1;">${phone}</a></td>
        </tr>
        ${referansRow}
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Seçilen Konut Tipi</td>
          <td style="padding: 10px; background: #fff;">${apartmentType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Aydınlatma Metni Onayı</td>
          <td style="padding: 10px; background: #fff;"><span style="color: ${kvkkColor}; font-weight: bold;">${kvkkStatus}</span></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f3f4f6;">Gönderilme Tarihi</td>
          <td style="padding: 10px; background: #fff;">${new Date().toLocaleString(
            "tr-TR"
          )}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Bu e-posta, web sitesindeki kooperatif payı talep formundan otomatik gelmiştir.
      </p>
    </div>
      `,
      // Alt metin (plain text)
      text: `Yeni Hisse Talep Formu\nAd Soyad: ${name} ${surname}\nE-posta: ${email}\nTelefon: ${phone}\nSeçilen Konut Tipi: ${apartmentType}\nAydınlatma Metni Onayı: ${kvkkStatus}`,
    };

    // Mail gönder - try/catch içinde
    console.log("📧 Mail gönderiliyor...");
    await transporter.sendMail(mailData);
    console.log("✅ Mail başarıyla gönderildi");

    return NextResponse.json(
      { message: "Form başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Form gönderimi hatası:", error);

    // Daha detaylı hata mesajı
    const errorMessage = error.message || "Bilinmeyen hata";

    return NextResponse.json(
      {
        error: "Form gönderilirken bir hata oluştu",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
