import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const { name } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "İsim gerekli" }, { status: 400 });
  }

  // İsim uzunluk kontrolü
  if (name.trim().length === 0 || name.length > 100) {
    return NextResponse.json(
      { error: "İsim 1-100 karakter arasında olmalı" },
      { status: 400 }
    );
  }

  try {
    const token = jwt.sign({ name: name.trim() }, process.env.REF_JWT_SECRET);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
