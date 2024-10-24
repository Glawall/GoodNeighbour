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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = __importDefault(require("./seed"));
const connection_1 = __importDefault(require("../../connection"));
const test_1 = require("./data/test");
const development_1 = require("./data/development");
const ENV = process.env.NODE_ENV || "development";
const runSeed = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, seed_1.default)(data);
        console.log("Seeding completed successfully.");
    }
    catch (error) {
        console.error("Error seeding data:", error);
    }
    finally {
        yield connection_1.default.end();
    }
});
const dataToSeed = ENV === "test" ? test_1.testData : development_1.devData;
if (dataToSeed) {
    runSeed(dataToSeed);
}
else {
    console.warn("No seed data available for the current environment.");
}
exports.default = runSeed;
