import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface Goal {
  _id?: string;
  createdAt?: Date;
  userId: string;
  trainingFactor: number;
  previousWeight: number;
  previousCalories: number;
  currentWeight: number;
  currentCalories: number;
}

export const getGoalCollection = async () => {
  const db = await getDb();
  return db.collection<Goal>("weekgoal");
};

export const createGoal = async (data: any) => {
  if (!data.currentWeight || !data.trainingFactor) {
    return 1;
  }
  data.createdAt = new Date();
  const col = await getGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};
//
//
//
export const getCurrentWeekGoalByUser = async (userId: string) => {
  const col = await getGoalCollection();
  return col.find({ userId: userId }).sort({ _id: -1 }).limit(1).toArray();
};
