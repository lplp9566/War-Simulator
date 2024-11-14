import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users, { IUser } from "../models/users";
import organization from "../models/organization";
import { getUserByToken } from "../servers/server";
const SECRET_KEY: string = process.env.SECRET_KEY || " my_secret";
export const createUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = req.body;
    console.log("Received user:", user);
    try {
      const findUserName = await Users.findOne({ userName: user.userName });
      if (findUserName) {
        res.status(400).json({ message: "username is already use" });
        return;
      }
  
      if (user.organization !== "IDF") {
        const resources = await getResources(user.organization);
        if (!resources) {
          res.status(400).json({ message: "Organization resources not found" });
          return;
        }
  
        const newUser: IUser = new Users({
          userName: user.userName,
          password: user.password,
          organization: user.organization,
          resources: resources,
        });
        newUser.resources?.push();
        const addUser = await newUser.save();
        res.status(201).json({ id: addUser._id, newUser });
      } else {
        const resources = await getResources(user.location);
        console.log("Resources for location:", resources);
        if (resources) {
          const newUser: IUser = new Users({
            userName: user.userName,
            password: user.password,
            organization: user.organization,
            resources: resources,
            location: user.location,
          });
          newUser.resources?.push();
          console.log("User location:", newUser.location);
          const addUser = await newUser.save();
          res.status(201).json({ id: addUser._id, newUser });
        } else {
          res.status(400).json({ message: "Location resources not found" });
        }
      }
    } catch (error) {
      console.error("Error in userName:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

const getResources = async (name: string) => {
  const organizationUser = await organization.findOne({ name: name });
  return organizationUser?.resources}


export const loginUser = async (req:Request,res:Response)=>{
    const {userName,password} =req.body;
  
    try{
        const findUser = await Users.findOne({userName: userName,password:password});
        if(!findUser){
            throw new Error()
        }
        const userId =findUser?._id
        const token = jwt.sign({userId},SECRET_KEY,{expiresIn :"1h"})
        res.status(200).json({user:findUser, token:token})
    }
    catch{
        res.status(400).json("The username or password is incorrect")
    }
}
//קבלת כל האירועים שהיוזר יצר על ידי שליחת הטוקן 
// אני מחזיר רק את האירועים 
export const getAllLaunchedRockets = async (req:Request,res:Response)=>{
    const {usersToken} = req.body;
    try {
        
        const decoded = jwt.verify(usersToken, SECRET_KEY) as { userId: string };
        const userFind = await Users.findById(decoded.userId);
        if(!userFind){
            throw new Error()
        }
        res.status(200).json(userFind.launchedRockets)
    } catch (error) {
        res.status(400).json("OOKL")
    }
}
export const getToken = async (req:Request,res:Response)=>{
    const {usersToken} = req.body;
    try {
       const user = await getUserByToken(usersToken)
     
        if(!user){
            throw new Error()
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("OOKL")
    }
}
export { getUserByToken };

