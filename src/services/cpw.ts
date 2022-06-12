import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface CaloriesPerWeight {
  _id?: ObjectId;
  createdAt?: Date;
  weight: number;
  calories: number;
  foodId: string;
}

export const getCaloriesPerWeight = async () => {
  const db = await getDb();
  return db.collection<CaloriesPerWeight>("foodcpw");
};

export const createCPW = async (data: any) => {
  if (!data.foodId || !data.foodWeight || !data.foodCalories) {
    return 0;
  }
  data.createdAt = new Date();
  const col = await getCaloriesPerWeight();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};
//
//
//
export const getAllCPW = async () => {
  const col = await getCaloriesPerWeight();
  return col.find().toArray();
};

export const getCPWByFoodId = async (foodId: string) => {
  const col = await getCaloriesPerWeight();
  return col.find({ foodId }).toArray();
};
