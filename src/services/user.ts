import { ObjectId } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface User {
  _id?: string;
  createAt: number;
  firstName: string;
  lastName: string;
  email: string;
  ageGroup: number;
}

export const getUserCollection = async () => {
  const db = await getDb();
  return db.collection<User>("user");
};

export const createUser = async (data: User) => {
  if (!data.firstName || !data.email || !data.ageGroup) {
    return 1;
  }
  const col = await getUserCollection();
  const { insertedId } = await col.insertOne(data);
  return insertedId.toString();
};

export const getAllUsers = async () => {
  const col = await getUserCollection();
  return col.find().toArray();
};

export const getUserById = async (id: ObjectId) => {
  const col = await getUserCollection();
  return col.findOne({ _id: id as any });
};

export const getUserByEmail = async (email: string) => {
  const col = await getUserCollection();
  return col.findOne({
    email: {
      $regex: `.*${email}.*`,
    },
  });
};

// The code commented bellow is not mandatory at this point - Phase 5
//
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

// export const delUserByEmail = async (email) => {
//   const col = await getUserCollection();
//   const target = await getUserByEmail(email);
//   const result = col.deleteOne(target._id);
// };
