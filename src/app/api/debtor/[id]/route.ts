import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../auth/[...nextauth]/options";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ message: "not exist debtorId" });
    }
    const { totalDebt } = await req.json();
    const res = await prisma.debtor.update({
      where: { id },
      data: {
        totalDebt,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
