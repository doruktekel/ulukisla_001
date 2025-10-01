import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Get form data from request
    const { name, surname, phone, email, apartmentType } = await req.json();

    // Input validation
    const errors = {};

    if (!name) errors.name = "Ad alanı zorunludur";
    if (!surname) errors.surname = "Soyad alanı zorunludur";
    if (!phone) errors.phone = "Telefon alanı zorunludur";
    if (!email) errors.email = "E-posta alanı zorunludur";
    if (!apartmentType) errors.apartmentType = "Apartman tipi alanı zorunludur";

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz";
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = "Geçerli bir telefon numarası giriniz";
    }

    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    console.log("SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS,
    });

    const smtpPort = parseInt(process.env.SMTP_PORT || "465");

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465, //  true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Timeout ayarları - Vercel için önemli
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // SMTP bağlantısını test et
    console.log("SMTP bağlantısı test ediliyor...");
    try {
      await transporter.verify();
      console.log("✅ SMTP bağlantısı başarılı");
    } catch (verifyError) {
      console.error("❌ SMTP verify hatası:", verifyError.message);
      throw new Error(`SMTP bağlantı hatası: ${verifyError.message}`);
    }

    const mailData = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Yeni İletişim Formu Başvurusu",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <h1 style="color: #333; text-align: center;">📩 Yeni Form Başvurusu</h1>
      <p style="color: #555; font-size: 15px; text-align: center;">Aşağıda kullanıcı bilgilerini bulabilirsiniz:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1; width: 35%;">Ad</td>
          <td style="padding: 10px; background: #fff;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Soyad</td>
          <td style="padding: 10px; background: #fff;">${surname}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Telefon</td>
          <td style="padding: 10px; background: #fff;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">E-posta</td>
          <td style="padding: 10px; background: #fff;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Apartman Tipi</td>
          <td style="padding: 10px; background: #fff;">${apartmentType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Gönderilme Tarihi</td>
          <td style="padding: 10px; background: #fff;">${new Date().toLocaleString(
            "tr-TR"
          )}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        Bu mail otomatik olarak gönderilmiştir. Yanıtlamayın.
      </p>
    </div>
  `,
    };

    // Send email
    await transporter.sendMail(mailData);

    // Return success response
    return NextResponse.json(
      { message: "Form başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form gönderimi sırasında hata:", error);

    // Return error response
    return NextResponse.json(
      { error: "Form gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
