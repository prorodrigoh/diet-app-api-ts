import { getDb } from "../gateway/mongo";
import { getCurrentGoalByUser } from "./goal";

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
    return 1;
  }
  const col = await getDailyGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

export const getCurrentDailyGoalByGoalId = async (goalId: string) => {
  const col = await getDailyGoalCollection();
  return col.find({ goalId: goalId }).sort({ _id: -1 }).limit(1).toArray();
  //return col.findOne({ goalId: goalId, $sort: { _id: -1 } });
};
