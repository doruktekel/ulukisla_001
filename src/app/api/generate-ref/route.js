import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const { name } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "İsim gerekli" }, { status: 400 });
  }

  console.log(name);

  try {
    const token = jwt.sign({ name }, process.env.REF_JWT_SECRET);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
