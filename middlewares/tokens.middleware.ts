import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CustomJwtPayload } from "jsonwebtoken";

export async function verifyTokenMiddleware(req: Request,res: Response,next: NextFunction) {
  try {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];
    if (!token) throw {code:"MDW-TK", status: 401, message:"No token find"};
    if (type !== "Bearer") throw {code:"MDW-TK", status: 401, message:"No bearer find"};
    req["user"] = <CustomJwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next()
  } catch (error) {
    res.status(401).json(error)
  }
}

export async function verifyRefreshMiddleware(req: Request,res: Response,next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw {code:"MDW-TK-REFRESH", status: 401, message:"No refresh token find"};
    req["user"] = <CustomJwtPayload>jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET );
    next()
  } catch (error) {
    res.status(401).json("FAILED TO REFRESH")
  }
}
