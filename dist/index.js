"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const functions = __importStar(require("firebase-functions"));
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
const user_1 = require("./services/user");
const food_1 = require("./services/food");
const cpw_1 = require("./services/cpw");
const goal_1 = require("./services/goal");
const dailygoal_1 = require("./services/dailygoal");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// >>>>>>>>>>>>>>>>>>>>> CREATE <<<<<<<<<<<<<<<<<<<<<<< //
// TESTED
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_1.createUser)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "User creation not Possible",
        });
    }
}));
// TESTED
app.post("/createfood", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, food_1.createFood)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Food creation not Possible",
        });
    }
}));
// TESTED
app.post("/createcpw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cpw_1.createCPW)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "CPW creation not Possible",
        });
    }
}));
// TESTED
app.post("/creategoal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, goal_1.createGoal)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Weekly goal creation not Possible",
        });
    }
}));
// TESTED
app.post("/createdailygoal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dailygoal_1.createDailyGoal)(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Daily goal creation not Possible",
        });
    }
}));
// >>>>>>>>>>>>>>>>>>>>> READ <<<<<<<<<<<<<<<<<<<<<<< //
// TESTED
app.get("/", (req, res) => {
    res.status(200).send("Landing Page Here");
});
// TESTED
app.get("/login/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFood = yield (0, user_1.getUserByEmail)(req.params.email);
    res.status(200).send(userFood);
}));
// TESTED
app.get("/allusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allusers = yield (0, user_1.getAllUsers)();
    res.status(200).send(allusers);
}));
// TESTED
app.get("/allfoods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allfoods = yield (0, food_1.getAllFoods)();
    res.status(200).send(allfoods);
}));
// TESTED
app.get("/allcpw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allcpw = yield (0, cpw_1.getAllCPW)();
    res.status(200).send(allcpw);
}));
// TESTED
app.get("/allfoodsbyuser/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allfoodsbyuser = yield (0, food_1.getAllFoodsByUser)(req.params.userid);
        res.status(200).send(allfoodsbyuser);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with user",
        });
    }
}));
app.get("/allfoodsofthedaybyuser/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, food_1.getAllFoodsOfTheDayByUser)(req.params.userid);
        res.status(200).send(data);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with user",
        });
    }
}));
app.get("/allcpwbyfoodid/:foodid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allcpwbyfoodid = yield (0, cpw_1.getCPWByFoodId)(req.params.foodid);
        res.status(200).send(allcpwbyfoodid);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with food",
        });
    }
}));
// TESTED
app.get("/userbyid/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongodb_1.ObjectId(req.params);
        const userbyid = yield (0, user_1.getUserById)(id);
        res.status(200).send(userbyid);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with user by id ",
        });
    }
}));
// TESTED
app.get("/foodbyid/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongodb_1.ObjectId(req.params);
        const foodbyid = yield (0, food_1.getFoodById)(id);
        res.status(200).send(foodbyid);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: "Problems with food by id ",
        });
    }
}));
//TESTED
app.get("/currentweekgoalbyuser/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userid;
    try {
        const weekgoal = yield (0, goal_1.getCurrentGoalByUser)(userId);
        res.status(200).send(weekgoal);
    }
    catch (err) {
        // send the response a json object instead of text
        res.status(400).send({
            message: `Problems with goal by user id ${userId}`,
        });
    }
}));
//TESTED
app.get("/dailygoalbyuser/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userid;
    try {
        const data = yield (0, goal_1.getCurrentGoalByUser)(userId);
        const dailygoal = yield (0, dailygoal_1.getCurrentDailyGoalByGoalId)(data[0]._id);
        res.status(200).send(dailygoal);
    }
    catch (err) {
        console.log(err);
        // send the response a json object instead of text
        res.status(400).send({
            message: `Problems with daily goal by user id ${userId}`,
        });
    }
}));
//TESTED
app.get("/dailygoalbygoalid/:goalid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailygoal = yield (0, dailygoal_1.getCurrentDailyGoalByGoalId)(req.params.goalid);
        res.status(200).send(dailygoal);
    }
    catch (err) {
        console.log(err);
        // send the response a json object instead of text
        res.status(400).send({
            message: `Problems with daily goal by goal id ${req.params.goalid}`,
        });
    }
}));
// >>>>>>>>>>>>>>>>>>>>> UPDATE <<<<<<<<<<<<<<<<<<<<<<< //
// >>>>>>>>>>>>>>>>>>>>> DELETE <<<<<<<<<<<<<<<<<<<<<<< //
exports.api = functions.https.onRequest(app);
