
import { Request, Response } from "express";
import missiles, { IMissiles } from "../models/missiles";
import { getUserByToken } from "./userController";
import { addAttack, getMissileDetails } from "../servers/server";

export const getMissile = async (req:Request,res:Response):Promise<void>=>{
    const {nameOfMissile} = req.body;
try {
    const missile = await getMissileDetails(nameOfMissile)
    if(!missile){
     throw new Error()
    }
    res.status(200).json(missile)
} catch (error) {
    res.status(400).json("There is no such missile")
}
} 
export const createAttack = async (req:Request,res:Response):Promise<void>=>{
    try {
        const{usersToken,nameOfMissile} =req.body
       
        const missileTime = await addAttack(usersToken,nameOfMissile)
    
        if(!missileTime){
            throw new Error()
        }
        res.status(200).json(missileTime)
        
    } catch (error) {
        res.status(400).json("JJJJ")
    }
}
