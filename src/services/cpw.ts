// import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
// import { UserFood } from "./userFood";

export interface CaloriesPerWeight {
  // id?: ObjectId;
  createdAt: number;
  weight: number;
  calories: number;
  foodId: string;
}

export const getCaloriesPerWeight = async () => {
  const db = await getDb();
  return db.collection<CaloriesPerWeight>("cpw");
};

// return all registered cpw in the app (admin)
export const getAllCPW = async () => {
  const col = await getCaloriesPerWeight();
  return col.find().toArray();
};

export const getCPWByFoodId = async (foodId: string) => {
  const col = await getCaloriesPerWeight();
  return col.find({ foodId }).toArray();
};

export const createCPW = async (data: any) => {
  // if the food is already in the DB thrown error. Should be selected from the list
  if (!data.foodId || !data.foodWeight || !data.foodCalories) {
    return 0;
  }

  // add data to UserFood Collection
  const col = await getCaloriesPerWeight();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};
