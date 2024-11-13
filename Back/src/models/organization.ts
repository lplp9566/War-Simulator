import mongoose, { Schema, Document, Types } from "mongoose";
export interface IResources extends Document{
    name:string,
    amount:number
}
export interface IOrganization extends Document{
    name :string,
    resources:Types.ObjectId[]
    budget:number
}
export  const ResourcesSchema = new Schema<IResources>({
    name:{type:String
    },
    amount:{
        type:Number
    }
})

 export const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    resources:[ResourcesSchema],
    budget:{type:Number}
   })

    
   export default mongoose.model<IOrganization>("Organization",OrganizationSchema)
   