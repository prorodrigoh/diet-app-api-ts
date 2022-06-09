import { MongoClient } from "mongodb";
import MONGO_URL from "../secrets";

export const getDb = async () => {
  const client = new MongoClient(MONGO_URL!);
  await client.connect();
  return client.db("diet-app");
};

export const closeDb = async () => {
  const client = new MongoClient(MONGO_URL!);
  await client.close();
};
