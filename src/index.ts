import express from "express";
import cors from "cors";
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
import { createGoal, getCurrentGoalByUser } from "services/goal";
import { createDailyGoal, getCurrentDailyGoalByUser } from "services/dailygoal";

config();

const app = express();
app.use(express.json());
app.use(cors());

// >>>>>>>>>>>>>>>>>>>>> CREATE <<<<<<<<<<<<<<<<<<<<<<< //

app.post("/createuser", async (req, res) => {
  try {
    await createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "User creation is not Possible",
    });
  }
});

// This will create a new food in the DB
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
app.post("/creategoal", async (req, res) => {
  try {
    await createGoal(req.body);
    res.sendStatus(200);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Daily goal creation not Possible",
    });
  }
});

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

// >>>>>>>>>>>>>>>>>>>>> READ <<<<<<<<<<<<<<<<<<<<<<< //

app.get("/", (req, res) => {
  res.status(200).send("Landing Page Here");
});

app.get("/login", async (req, res) => {
  const userFood = await getUserByEmail(req.body);
  res.status(200).send(userFood);
});

app.get("/allusers", async (req, res) => {
  const allusers = await getAllUsers();
  res.status(200).send(allusers);
});

app.get("/allfoods", async (req, res) => {
  const allfoods = await getAllFoods();
  res.status(200).send(allfoods);
});

app.get("/allcpw", async (req, res) => {
  const allcpw = await getAllCPW();
  res.status(200).send(allcpw);
});

app.get("/allfoodsbyuser", async (req, res) => {
  try {
    const allfoodsbyuser = await getAllFoodsByUser(req.body);
    res.status(200).send(allfoodsbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user " + req.body,
    });
  }
});

app.get("/userbyid/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const userbyid = await getUserById(id as any);
    res.status(200).send(userbyid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user by id " + req.body,
    });
  }
});

app.get("/foodbyid/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const foodbyid = await getFoodById(id as any);
    res.status(200).send(foodbyid);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with food " + req.body,
    });
  }
});

app.get("/goalbyuser/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const goalbyuser = await getCurrentGoalByUser(id as any);
    res.status(200).send(goalbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user " + req.body,
    });
  }
});

app.get("/dailygoalbyuser/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params as any);
    const dailygoalbyuser = await getCurrentDailyGoalByUser(id as any);
    res.status(200).send(dailygoalbyuser);
  } catch (err) {
    // send the response a json object instead of text
    res.status(400).send({
      message: "Problems with user " + req.body,
    });
  }
});
// >>>>>>>>>>>>>>>>>>>>> UPDATE <<<<<<<<<<<<<<<<<<<<<<< //

// >>>>>>>>>>>>>>>>>>>>> DELETE <<<<<<<<<<<<<<<<<<<<<<< //

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
