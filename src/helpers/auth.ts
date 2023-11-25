import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { compare } from "bcryptjs";

export const authChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "bad request!",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    // if user does not exists with given email
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "email or password is wrong!",
      });
    }

    // password is wrong
    const isMatch = await compare(password, user.password_hash || "");
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "email or password is wrong!",
      });
    }
    req.body.user_id = user.id;
  } catch (err) {
    // error handling
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }

  // sending to next call
  next();
};
