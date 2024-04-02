import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();

    // Assuming you have an email and otp field in reqBody
    const { email, otp } = reqBody;

    const count = await prisma.users.count({
      where: {
        email: email,
        otp: otp,
      },
    });

    if (count === 1) {
      return NextResponse.json({ status: "success", data: "OTP is valid" });
    } else {
      return NextResponse.json({
        status: "fail",
        data: "User invalid or OTP incorrect",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error.message });
  }
};
