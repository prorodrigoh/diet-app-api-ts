import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface DailyGoal {
  _id?: string;
  createdAt: number;
  goalId: string;
  dailyCalories: number; // update every time user add food from the Food page
  daysToWeightIn: number; // set initially at 7. The last one to be created will set it to 1
}

export const getDailyGoalCollection = async () => {
  const db = await getDb();
  return db.collection<DailyGoal>("dailygoal");
};

export const createDailyGoal = async (data: any) => {
  if (!data.goalId || !data.dailyCalories) {
    return "Daily Goal fields incomplete";
  }
  const col = await getDailyGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

export const getCurrentDailyGoalByUser = async (userId: string) => {
  const col = await getDailyGoalCollection();
  return col.find({ userId: userId }).sort({ _id: -1 }).limit(1).toArray();
};
