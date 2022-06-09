import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { calculateCaloriesFromNew, getFoodCaloriesPerWeight } from "./cpw";

export interface Goal {
  _id?: string;
  createdAt: number;
  userId: string;
  trainingFactor: number;
  previousWeight: number;
  previousCalories: number;
  currentWeight: number;
  currentCalories: number;
}

export const getGoalCollection = async () => {
  const db = await getDb();
  return db.collection<Goal>("goal");
};

export const createGoal = async (data: any) => {
  // if the food is already in the DB thrown error. Should be selected from the list
  if (!data.iniWeight || !data.height) {
    return "Goal fields incomplete";
  }
  const col = await getGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

export const getCurrentGoalByUser = async (userId: string) => {
  const col = await getGoalCollection();
  return col.find({ userId: userId }).sort({ _id: -1 }).limit(1).toArray();
};
