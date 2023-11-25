import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    return res.status(400).json({
      status: false,
      message: "invalid jwt token",
    });
  }

  try {
    // verifying jwt token
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.body.user_id = data.user_id;
    req.body.email = data.email;
  } catch (err) {
    // error handling
    return res.status(400).json({
      status: false,
      message: "invalid jwt token",
      error: err,
    });
  }

  // sending to next call
  next();
};
