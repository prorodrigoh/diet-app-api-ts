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
  getAllFoodsOfTheDayByUser,
  getFoodById,
} from "./services/food";
import { createCPW, getAllCPW, getCPWByFoodId } from "./services/cpw";
import { createGoal, getCurrentGoalByUser } from "./services/goal";
import {
  createDailyGoal,
  getCurrentDailyGoalByGoalId,
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
    await createGoal(req.body);
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
    await createDailyGoal(req.body);
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

app.get("/allfoodsofthedaybyuser/:userid", async (req, res) => {
  try {
    const data = await getAllFoodsOfTheDayByUser(req.params.userid);
    res.status(200).send(data);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user",
    });
  }
});

app.get("/allcpwbyfoodid/:foodid", async (req, res) => {
  try {
    const allcpwbyfoodid = await getCPWByFoodId(req.params.foodid);
    res.status(200).send(allcpwbyfoodid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with food",
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
  let userId = req.params.userid;
  try {
    const weekgoal = await getCurrentGoalByUser(userId);
    res.status(200).send(weekgoal);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: `Problems with goal by user id ${userId}`,
    });
  }
});

//TESTED
app.get("/dailygoalbyuser/:userid", async (req, res) => {
  let userId = req.params.userid;
  try {
    const data = await getCurrentGoalByUser(userId);

    const dailygoal = await getCurrentDailyGoalByGoalId(data[0]._id);

    res.status(200).send(dailygoal);
  } catch (err) {
    console.log(err);
    // send the response a json object instead of text
    res.status(400).send({
      message: `Problems with daily goal by user id ${userId}`,
    });
  }
});

//TESTED
app.get("/dailygoalbygoalid/:goalid", async (req, res) => {
  try {
    const dailygoal = await getCurrentDailyGoalByGoalId(req.params.goalid);
    res.status(200).send(dailygoal);
  } catch (err) {
    console.log(err);
    // send the response a json object instead of text
    res.status(400).send({
      message: `Problems with daily goal by goal id ${req.params.goalid}`,
    });
  }
});
// >>>>>>>>>>>>>>>>>>>>> UPDATE <<<<<<<<<<<<<<<<<<<<<<< //

// >>>>>>>>>>>>>>>>>>>>> DELETE <<<<<<<<<<<<<<<<<<<<<<< //

export const api = functions.https.onRequest(app);
