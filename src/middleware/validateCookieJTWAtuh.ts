import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

import { RequestWithUser } from "../types/Request"

export function validateCookieJWTAuth(req: RequestWithUser, res: Response, next: NextFunction){
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET as string);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};