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
const express_1 = __importDefault(require("express"));
const preloadHelpTypes_1 = require("./utils/preloadHelpTypes");
const errorHandler_1 = __importDefault(require("./errors/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// * Parser
app.use(express_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, preloadHelpTypes_1.preloadHelpTypes)();
    }
    catch (error) {
        console.error("Error preloading help types:", error);
    }
}))();
// * Route
app.use(routes_1.default);
// * Custom Error Handler
app.use(errorHandler_1.default);
exports.default = app;
