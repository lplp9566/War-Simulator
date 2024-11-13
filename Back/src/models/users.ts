import mongoose, { Schema, Document, Types } from "mongoose";
import {OrganizationSchema} from "./organization";

export interface IResource{
    name : string,
    amount : number
}

export interface IUser  extends Document{
    userName: string;
    password: string;
    organization: string;
    location: "North" | "South" | "Center" | "West Bank"  |null;
    resources : IResource[] | null;
    lounchedRockets?: null;}

export const UsersSchema = new Schema<IUser>({
    userName:{
        type:String,
        required :true
    },
    password:{
        type:String,
        minlength:[3,"most be 3 "],
        maxlength:[9,"most be last then 9"]
    },
    organization:{
        type:String
    },
    resources: {
        type: Array<IResource>,
        default: [] 
      },
location:{
    type: String,
    enum: ["North", "South", "Center", "West Bank", "null"],
}
})

export default mongoose.model<IUser>("users",UsersSchema)