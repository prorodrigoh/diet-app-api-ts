"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDailyGoalByGoalId = exports.createDailyGoal = exports.getDailyGoalCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getDailyGoalCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("dailygoal");
});
exports.getDailyGoalCollection = getDailyGoalCollection;
const createDailyGoal = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.goalId || !data.dailyCalories) {
        return 1;
    }
    data.createdAt = new Date();
    const col = yield (0, exports.getDailyGoalCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createDailyGoal = createDailyGoal;
//
//
//
const getCurrentDailyGoalByGoalId = (goalId) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getDailyGoalCollection)();
    return col.find({ goalId: goalId }).sort({ _id: -1 }).limit(1).toArray();
});
exports.getCurrentDailyGoalByGoalId = getCurrentDailyGoalByGoalId;
