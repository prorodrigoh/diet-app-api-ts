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
exports.getUserByEmail = exports.getUserById = exports.getAllUsers = exports.createUser = exports.getUserCollection = void 0;
const mongo_1 = require("../gateway/mongo");
const getUserCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongo_1.getDb)();
    return db.collection("user");
});
exports.getUserCollection = getUserCollection;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.firstName || !data.email || !data.ageGroup) {
        return 1;
    }
    const col = yield (0, exports.getUserCollection)();
    const { insertedId } = yield col.insertOne(data);
    return insertedId.toString();
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getUserCollection)();
    return col.find().toArray();
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getUserCollection)();
    return col.findOne({ _id: id });
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const col = yield (0, exports.getUserCollection)();
    return col.findOne({
        email: {
            $regex: `.*${email}.*`,
        },
    });
});
exports.getUserByEmail = getUserByEmail;
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
