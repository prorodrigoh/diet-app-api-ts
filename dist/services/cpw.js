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
exports.getCPWByFoodId = exports.getAllCPW = exports.createCPW = exports.getCaloriesPerWeight = void 0;
const mongo_1 = require("../gateway/mongo");
const getCaloriesPerWeight = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("cpw");
});
exports.getCaloriesPerWeight = getCaloriesPerWeight;
const createCPW = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.foodId || !data.foodWeight || !data.foodCalories) {
        return 0;
    }
    data.createdAt = new Date();
    const col = yield (0, exports.getCaloriesPerWeight)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createCPW = createCPW;
//
//
//
const getAllCPW = () => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getCaloriesPerWeight)();
    return col.find().toArray();
});
exports.getAllCPW = getAllCPW;
const getCPWByFoodId = (foodId) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getCaloriesPerWeight)();
    return col.find({ foodId }).toArray();
});
exports.getCPWByFoodId = getCPWByFoodId;
