import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users, { IUser } from "../models/users";
import organization from "../models/organization";
const SECRET_KEY: string = process.env.SECRET_KEY || " my_secret";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.body;

  try {
    const findUserName = await Users.findOne({ userName: user.userName });
    if (findUserName) {
      res.status(400).json({ message: "username is already use" });
      return;
    }

    const resources = await getResures(user.organization);
    const newUser: IUser = new Users({
      userName: user.userName,
      password: user.password,
      organization: user.organization,
      resources: resources,
    });

    newUser.resources?.push();
    const addUser = await newUser.save();

    res.status(201).json({ id: addUser._id, newUser });
  } catch (error) {
    console.error("Error in userName:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getResures = async (name: string) => {
  const organizationUser = await organization.findOne({ name: name });
  return organizationUser?.resources;
};
