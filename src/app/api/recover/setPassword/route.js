import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const reqBody = await req.json();
  const prisma = new PrismaClient();
  const count = await prisma.users.count({
    where: { email: reqBody["email"], otp: reqBody["otp"] },
  });
  if (count === 1) {
    const result = await prisma.users.update({
      where: { email: reqBody["email"] },
      data: {
        otp: "0",
        password: reqBody["password"],
      },
    });
    return NextResponse.json({ status: true, data: result });
  } else {
    return NextResponse.json({ status: false });
  }
};
