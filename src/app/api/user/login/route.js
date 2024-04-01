import { createJwtToken, jwtTokenCreate } from "@/utils/jwtTokenHelper";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const reqBody = await req.json();

    const prisma = new PrismaClient();
    const result = await prisma.users.findUnique({
      where: reqBody,
    });
    if (result.length === 0) {
      return NextResponse.json({ status: "failed", data: result });
    } else {
      const token = await createJwtToken(result["email"], result["id"]);
      const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookie = `token=${token};expires=${expireTime};path=/`;
      return NextResponse.json({status:'success',data:result},{headers:{set_cookie:cookie}})
    }
    // if (!result) {
    //   return NextResponse.json(
    //     { status: "failed", data: result },
    //     { status: 404 }
    //   );
    // } else {
    //   const token = await jwtTokenCreate(result["email"], result["id"]);
    //   const expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    //   const cookie = `token=${token};expires=${expireDuration.toUTCString()};path=/`;

    //   await prisma.$disconnect(); // Close the Prisma client connection

    //   return NextResponse.json(
    //     { status: "success", data: token },
    //     { status: 200, headers: { "Set-Cookie": cookie } }
    //   );
    // }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
