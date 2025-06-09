import { prisma } from "@/app/api/auth/[...nextauth]/options";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const foundUser = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });
  if (foundUser) {
    return NextResponse.json({ message: "This user already exists" });
  }

  const email = " ";

  const user = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      role: "user",
      email,
    },
  });

  return NextResponse.json({ user });
}

export async function GET() {
  return NextResponse.json({ message: "Salom bu sign up" });
}
