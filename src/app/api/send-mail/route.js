import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Get form data from request
    const { name, surname, phone, email } = await req.json();

    // Input validation
    const errors = {};

    if (!name) errors.name = "Ad alanı zorunludur";
    if (!surname) errors.surname = "Soyad alanı zorunludur";
    if (!phone) errors.phone = "Telefon alanı zorunludur";
    if (!email) errors.email = "E-posta alanı zorunludur";

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

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email template
    const mailData = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Yeni İletişim Formu Başvurusu",
      html: `
        <h1>Yeni Form Başvurusu</h1>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Soyad:</strong> ${surname}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Gönderilme Tarihi:</strong> ${new Date().toLocaleString(
          "tr-TR"
        )}</p>
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
