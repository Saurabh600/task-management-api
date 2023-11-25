import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models/user";

export const createNewUser = async (req: Request, res: Response) => {
  const data = req.body;
  const user_name = data.name;
  const email = data.email;
  const password = data.password;
  const dob = data.dob;
  const gender = data.gender;

  if (!user_name || !email || !password || !password || !dob || !gender) {
    return res.status(400).json({
      status: false,
      messag: "bad request",
      data: [data],
    });
  }

  try {
    const doesUserExits = await User.findOne({ email: email });
    if (doesUserExits) {
      return res.status(400).json({
        status: false,
        message: "user with given email already exits",
      });
    }

    const hash = await bcryptjs.hash(data.password, 8);
    const user = await User.create({
      name: user_name,
      email: email,
      password_hash: hash,
      dob: dob,
      gender: gender,
    });

    await user.save();
    return res.status(201).json({
      status: "ok",
      message: "user created successfully",
      data: [user],
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "some error occured!",
      error: err,
    });
  }
};
