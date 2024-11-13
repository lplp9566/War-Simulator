const SECRET_KEY: string = process.env.SECRET_KEY || " my_secret";
import jwt from "jsonwebtoken"
import Users, { IUser } from "../models/users";
import missiles from "../models/missiles";
export const getUserByToken = async (token:string)=>{

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        const userFind = await Users.findById(decoded.userId);
        if(!userFind){
            throw new Error()
        }
       return userFind
    } catch (error) {
       console.error(error)
    }
}


export const getMissileDetails = async (nameOfMissile:string)=>{
    
try {
    const missile =await missiles.findOne({name:nameOfMissile})
    if(!missile){
     throw new Error()
    }
    return missile
} catch (error) {
   return
}}
export const addAttack = async (token:string,nameOfMissile:string):Promise<number |void>=>{
    try {
        const getUser = getUserByToken(token)
        if(!getUser){
            throw new Error()
        }
        const missile = await getMissileDetails(nameOfMissile)
        const time = missile!.speed
        if(!missile){
            throw new Error()
        }
       return time
        
    } catch (error) {
       return 
    }
}

export const addAttackTOmongo = async (user:IUser)=>{

}
