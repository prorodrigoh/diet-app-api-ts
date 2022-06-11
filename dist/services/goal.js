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
exports.getCurrentWeekGoalByUser = exports.createGoal = exports.getGoalCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getGoalCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("weekgoal");
});
exports.getGoalCollection = getGoalCollection;
const createGoal = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.currentWeight || !data.trainingFactor) {
        return 1;
    }
    data.createdAt = new Date();
    const col = yield (0, exports.getGoalCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createGoal = createGoal;
//
//
//
const getCurrentWeekGoalByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getGoalCollection)();
    return col.find({ userId: userId }).sort({ _id: -1 }).limit(1).toArray();
});
exports.getCurrentWeekGoalByUser = getCurrentWeekGoalByUser;
