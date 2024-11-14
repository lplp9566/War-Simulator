import jwt from "jsonwebtoken";
import Users, { IUser } from "../models/users";
import missiles from "../models/missiles";
import attacks, { IAttack } from "../models/attacks";
import { ObjectId, Schema, Types } from "mongoose";
const SECRET_KEY: string = process.env.SECRET_KEY || " my_secret";
export const getUserByToken = async (token: string): Promise<IUser | null> => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    const userFind = await Users.findById(decoded.userId);
    if (!userFind) {
      throw new Error();
    }
    return userFind;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMissileDetails = async (nameOfMissile: string) => {
  try {
    const missile = await missiles.findOne({ name: nameOfMissile });
    if (!missile) {
      throw new Error();
    }
    return missile;
  } catch (error) {
    return;
  }
};
export const addAttack = async (
  token: string,
  nameOfMissile: string,
  direction: string
): Promise<string | undefined> => {
  try {
    const getUser = await getUserByToken(token);
    if (!getUser) {
      throw new Error("user not found");
    }

    const missile = await getMissileDetails(nameOfMissile);
    if (!missile) {
      throw new Error("missile not found");
    }
    const time = missile.speed;
    await setAmount(getUser, missile.name);
    if (!setAmount) {
      throw new Error(" cnot set amont");
    }
    const addAttack = await AddAttackToAttacksModel(
      getUser.userName,
      direction,
      time
    );
    const newAttackId: Types.ObjectId |undefined = addAttack?._id

    if(!newAttackId){
        throw new Error(" cnot add atack");
    }
//  const yy = await editTimeOfMissile(newAttackId,10)
//     console.log(yy);
    if (!addAttack) {
      throw new Error(" cnot add atack");
    }
    return newAttackId!.toString();
  } catch (error) {
    console.error();
  }
};

export const setAmount = async (user: IUser, missile: string) => {
  try {
    const newUser = user;
    const res = newUser.resources?.find((r) => r.name == missile);
    if (!res) {
      throw new Error();
    }
    res.amount! -= 1;
    await Users.findOneAndUpdate(user._id!, { resources: user.resources });
  } catch (error) {}
};

const AddAttackToAttacksModel = async (
  userAttack: string,
  direction: string,
  time: number
) => {
  const newAttack: IAttack = {
    attackerUserName: userAttack,
    direction: direction,
    timeToKil: time,
    status: "Launched",
  };
  try {
    const addAttack = await attacks.create(newAttack);
    console.log(addAttack);
    return addAttack._id;
  } catch (error) {}
};

const editStatus = async (id:Types.ObjectId, newStatus: string) => {
    try {
      const edit = await attacks.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    //   console.log("Attack status updated:", edit);
    } catch (error) {
      console.error("Error in editStatus:", error);
    }
  };

  const myMissiles = async (id: Types.ObjectId): Promise<IAttack | undefined> => {
    try {
      const attack = await attacks.findById(id);
      if (!attack) {
        throw new Error("Attack not found");
      }
      return attack
    } catch (error) {
      console.error("Error in myMissiles:", error);
      return undefined;
    }
  };

  const editTimeOfMissile = async (id:Types.ObjectId,time:number):Promise<number |undefined>=>{
    try {
        
        const edit = await attacks.findByIdAndUpdate(id, { timeToKil: time }, { new: true });
        return edit?.timeToKil
    } catch (error) {
        console.error("Error in time:", error);
        return undefined;
    }
    
  }