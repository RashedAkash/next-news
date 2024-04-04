
import { NextResponse } from "next/server";
import { tokenDecode } from "./utils/jwtTokenHelper";
import { headers } from "next/headers";

export const middleware = async (req, res) => {
  try {
    const token = req.cookies.get('token');
    const payload = await tokenDecode(token['value']);
    const requestHeaders = new Headers(req.headers)
     requestHeaders.set('email',payload['email'])
    requestHeaders.set('id', payload['id'])
  return NextResponse.next({request:{headers:requestHeaders}})
  } catch (error) {
     const requestHeaders = new Headers(req.headers);
     requestHeaders.set("email", payload["0"]);
     requestHeaders.set("id", payload["0"]);
     return NextResponse.next({ request: { headers: requestHeaders } });
  }
}