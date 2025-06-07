import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const res = await prisma.payments.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { debtorId, amount } = await req.json();
    if (!debtorId || !amount) {
      return NextResponse.json({ message: "error" }, { status: 400 });
    }
    const res = await prisma.payments.create({
      data: {
        debtorId,
        amount,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { debtorId } = await req.json();

    const res = await prisma.payments.deleteMany({
      where: { debtorId: debtorId },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
