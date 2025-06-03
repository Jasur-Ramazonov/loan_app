import { prisma } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const debtors = await prisma.debtor.findMany();
    return NextResponse.json(debtors);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  const { userId, name, phone, totalDebt } = await req.json();
  if (!name || !totalDebt) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }

  try {
    const data = {
      userId,
      name,
      phone,
      totalDebt,
    };
    const response = await prisma.debtor.create({
      data,
    });
    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { debtorId } = await req.json();
    const response = await prisma.debtor.delete({
      where: {
        id: debtorId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
