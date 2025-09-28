import jwt, { JwtPayload as JWTType, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: JWTType, secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string): JWTType | string => {
  return jwt.verify(token, secret);
};
