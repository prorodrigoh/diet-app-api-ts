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
exports.getAllFoodsOfTheDayByUser = exports.getAllFoodsByUser = exports.getFoodById = exports.getAllFoods = exports.getCPWCollection = exports.createFood = exports.getFoodCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getFoodCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("food");
});
exports.getFoodCollection = getFoodCollection;
const createFood = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.foodName || !data.isoWeight || !data.isoCalories) {
        return 1;
    }
    data.createdAt = new Date();
    const col = yield (0, exports.getFoodCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId;
});
exports.createFood = createFood;
//
//
//
const getCPWCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("cpw");
});
exports.getCPWCollection = getCPWCollection;
//
//
//
const getAllFoods = () => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.find().toArray();
});
exports.getAllFoods = getAllFoods;
const getFoodById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.findOne({ _id: id });
});
exports.getFoodById = getFoodById;
const getAllFoodsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getFoodCollection)();
    return col.find({ userId: userId }).toArray();
});
exports.getAllFoodsByUser = getAllFoodsByUser;
const getAllFoodsOfTheDayByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const colFood = yield (0, exports.getFoodCollection)();
    const colCPW = yield (0, exports.getCPWCollection)();
    const arrFood = colFood
        .find({
        userId: userId,
        createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59)),
        },
    })
        .toArray();
});
exports.getAllFoodsOfTheDayByUser = getAllFoodsOfTheDayByUser;
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
