import { getDb } from "../gateway/mongo";

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
  if (!data.currentWeight || !data.trainingFactor) {
    return 1;
  }
  const col = await getGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

export const getCurrentGoalByUser = async (userId: string) => {
  const col = await getGoalCollection();
  return col.find({ userId: userId }).sort({ _id: -1 }).limit(1).toArray();
};
