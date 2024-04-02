import { sendEmail } from "@/utils/emailUtils";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const count = await prisma.users.count({
    where: { email: email },
  });

  if (count === 1) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const emailText = `Your OTP code is ${code}`;
    const emailSubject = "Next news verification code";
    await sendEmail(email, emailSubject, emailText);
    await prisma.users.update({
      where: { email: email },
      data: { otp: code.toString() },
    });
    return NextResponse.json({ status: "success", data: "OTP sent" });
  } else {
    return NextResponse.json({ status: "fail", data: "user not found" });
  }
};
