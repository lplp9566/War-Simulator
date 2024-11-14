import mongoose, { Schema } from "mongoose";

export interface IAttack {
  attackerUserName: string;
  direction: string;
  timeToKil: number;
  status:  "Launched" | "Hit" | "Intercepted";
}

const attackSchema = new Schema<IAttack>({
  attackerUserName: { type: String},
  direction: { type: String},
  timeToKil: { type: Number},
  status: {type: String, enum: ["Launched", "Hit", "Intercepted"]},
});

export default mongoose.model<IAttack>("Attacks", attackSchema);