import { getDb } from "../gateway/mongo";
import { ObjectId } from "mongodb";

export interface DailyGoal {
  _id?: ObjectId;
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

export const updateCalDailyGoal = async (id: string, value: any) => {
  const col = await getDailyGoalCollection();
  const updid = new ObjectId(id);
  const stat = col.updateOne(
    { _id: updid },
    {
      $set: {
        dailyCalories: value,
      },
    }
  ); // Here we are making use of ObjectID and not the string that comes with the parameters
  return stat;
};

// export const updUserName = async (oldName, newName) => {
//     const col = await getUserCollection()
//     const old = await getUserByName(oldName)
//     // update
//     const result = col.updateOne(
//         { _id: old.id },                // filter
//         { $set: { name: newName } },    // mongo set function
//     )
//     // return 1 or 0
//     return (`Total of modified documents: ${result.modifiedCount}`)
// }
//
//
//

export const getCurrentDailyGoalByGoalId = async (goalId: string) => {
  const col = await getDailyGoalCollection();
  return col.find({ goalId: goalId }).sort({ _id: -1 }).limit(1).toArray();
};
