import { SignJWT, jwtVerify } from "jose";

export const createJwtToken = async (email,id) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const payload = { email: email, id: id }
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_TIME)
    .sign(secret)
  return token
}

//verifyToken

export const tokenDecode = async (token) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const decoded = await jwtVerify(token,secret)
}