import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const reqBody = await req.json();
    reqBody.otp = "0";
    const prisma = new PrismaClient();
    const result = await prisma.users.create({
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json(error);
  }
};
