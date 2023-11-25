import { Request, Response, json } from "express";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const authController = async (req: Request, res: Response) => {
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

    // signing jwt
    const token = jwt.sign(
      { email: email, user_id: user.id },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      status: true,
      message: "authenticated successfully!",
      jwt_token: token,
    });
  } catch (err) {
    // error handling
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};
