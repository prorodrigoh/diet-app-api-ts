import express from "express";
import cors from "cors";
import * as functions from "firebase-functions";
import { config } from "dotenv";
import { ObjectId } from "mongodb";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} from "./services/user";
import {
  createFood,
  getAllFoods,
  getAllFoodsByUser,
  getFoodById,
} from "./services/food";
import { createCPW, getAllCPW } from "./services/cpw";
import { createGoal, getCurrentGoalByUser } from "./services/goal";
import {
  createDailyGoal,
  getCurrentDailyGoalByUser,
} from "./services/dailygoal";

config();

const app = express();
app.use(express.json());
app.use(cors());

// >>>>>>>>>>>>>>>>>>>>> CREATE <<<<<<<<<<<<<<<<<<<<<<< //

// TESTED
app.post("/signup", async (req, res) => {
  try {
    await createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "User creation not Possible",
    });
  }
});

// TESTED
app.post("/createfood", async (req, res) => {
  try {
    await createFood(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Food creation not Possible",
    });
  }
});

// TESTED
app.post("/createcpw", async (req, res) => {
  try {
    await createCPW(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "CPW creation not Possible",
    });
  }
});

// TESTED
app.post("/creategoal", async (req, res) => {
  try {
    console.log(req.body);
    //await createGoal(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Weekly goal creation not Possible",
    });
  }
});

// TESTED
app.post("/createdailygoal", async (req, res) => {
  try {
    console.log(req.body);
    //await createDailyGoal(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Daily goal creation not Possible",
    });
  }
});

// >>>>>>>>>>>>>>>>>>>>> READ <<<<<<<<<<<<<<<<<<<<<<< //

// TESTED
app.get("/", (req, res) => {
  res.status(200).send("Landing Page Here");
});

// TESTED
app.get("/login/:email", async (req, res) => {
  const userFood = await getUserByEmail(req.params.email);
  res.status(200).send(userFood);
});

// TESTED
app.get("/allusers", async (req, res) => {
  const allusers = await getAllUsers();
  res.status(200).send(allusers);
});

// TESTED
app.get("/allfoods", async (req, res) => {
  const allfoods = await getAllFoods();
  res.status(200).send(allfoods);
});

// TESTED
app.get("/allcpw", async (req, res) => {
  const allcpw = await getAllCPW();
  res.status(200).send(allcpw);
});

// TESTED
app.get("/allfoodsbyuser/:userid", async (req, res) => {
  try {
    const allfoodsbyuser = await getAllFoodsByUser(req.params.userid);
    res.status(200).send(allfoodsbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user",
    });
  }
});

// TESTED
app.get("/userbyid/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const userbyid = await getUserById(id as any);
    res.status(200).send(userbyid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user by id ",
    });
  }
});

// TESTED
app.get("/foodbyid/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const foodbyid = await getFoodById(id as any);
    res.status(200).send(foodbyid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with food by id ",
    });
  }
});

//TESTED
app.get("/currentweekgoalbyuser/:userid", async (req, res) => {
  try {
    const goalbyuser = await getCurrentGoalByUser(req.params.userid);
    res.status(200).send(goalbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with goal by user id",
    });
  }
});

//TESTED
app.get("/dailygoalbyuser/:userid", async (req, res) => {
  try {
    const data = await getCurrentGoalByUser(req.params.userid);
    const dailygoalbyuser = await getCurrentDailyGoalByUser(
      data[0]._id.toString()
    );
    res.status(200).send(dailygoalbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with daily goal by user id",
    });
  }
});

// >>>>>>>>>>>>>>>>>>>>> UPDATE <<<<<<<<<<<<<<<<<<<<<<< //

// >>>>>>>>>>>>>>>>>>>>> DELETE <<<<<<<<<<<<<<<<<<<<<<< //

export const api = functions.https.onRequest(app);
