import { getDb } from "../gateway/mongo";

export interface DailyGoal {
  _id?: string;
  createdAt?: Date;
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
  data.createdAt = new Date();
  const col = await getDailyGoalCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};
//
//
//

export const updateCalDailyGoal = async (id: string, data: any) => {
  if (!data.goalId || !data.dailyCalories) {
    return 1;
  }
  const col = await getDailyGoalCollection();
  col.updateOne({ _id: id }, { $set: data }); // Here we are making use of ObjectID and not the string that comes with the parameters

  return 0;
};
//
//
//

export const getCurrentDailyGoalByGoalId = async (goalId: string) => {
  const col = await getDailyGoalCollection();
  return col.find({ goalId: goalId }).sort({ _id: -1 }).limit(1).toArray();
};
