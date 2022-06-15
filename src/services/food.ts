import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";
import { CaloriesPerWeight } from "./cpw";
// import { calculateCaloriesFromNew, getFoodCaloriesPerWeight } from "./cpw";

export interface Food {
  _id?: string;
  createdAt: Date;
  userId: string;
  foodName: string;
  isoWeight: number;
  isoUnit: string;
  isoCalories: number;
}

export const getFoodCollection = async () => {
  const db = await getDb();
  return db.collection<Food>("food");
};

export const createFood = async (data: any) => {
  if (!data.foodName || !data.isoWeight || !data.isoCalories) {
    return 1;
  }
  data.createdAt = new Date();
  const col = await getFoodCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId;
};

//
//
//

export const getCPWCollection = async () => {
  const db = await getDb();
  return db.collection<CaloriesPerWeight>("foodcpw");
};

//
//
//

export const getAllFoods = async () => {
  const col = await getFoodCollection();
  return col.find().toArray();
};

export const getFoodById = async (id: ObjectId) => {
  const col = await getFoodCollection();
  return col.findOne({ _id: id as any });
};

export const getAllFoodsByUser = async (userId: string) => {
  const col = await getFoodCollection();
  return col.find({ userId: userId }).toArray();
};

const getFoodToCPW = async (userId: string) => {
  const colFood = await getFoodCollection();
  const foods = await colFood
    .find({
      userId: userId,
    })
    .toArray();
  const arrFoodId = foods.map((food) => {
    return food._id.toString();
  });
  return arrFoodId;
};

export const getAllFoodsOfTheDayByUser = async (userId: string) => {
  const arrFood = await getFoodToCPW(userId);
  const colCPW = await getCPWCollection();
  const arrCPW = await colCPW
    .find({
      foodId: {
        $in: arrFood,
      },
    })
    .toArray();
  return arrCPW;
};

// TO USER LATER IF HAVE TIME
//
// The code commented bellow is not mandatory at this point - Phase 5
//
// export const updUserName = async (oldName, newName) => {
//     const col = await getUserFoodCollection()
//     const old = await getUserByName(oldName)
//     // update
//     const result = col.updateOne(
//         { _id: old.id },                // filter
//         { $set: { name: newName } },    // mongo set function
//     )
//     // return 1 or 0
//     return (`Total of modified documents: ${result.modifiedCount}`)
// }

// export const delUserByEmail = async (email) => {
//   const col = await getUserFoodCollection();
//   const target = await getUserByEmail(email);
//   const result = col.deleteOne(target._id);
// };
