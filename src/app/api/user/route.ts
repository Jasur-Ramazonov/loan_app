import { NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";
export async function GET() {
  try {
    const response = await prisma.user.findMany();
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
