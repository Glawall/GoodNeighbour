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
exports.getHelpTypeId = exports.preloadHelpTypes = void 0;
const connection_1 = __importDefault(require("../connection"));
let helpTypesCache = {};
const preloadHelpTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query("SELECT id, name FROM help_types");
    rows.forEach((row) => {
        helpTypesCache[row.name] = row.id;
    });
});
exports.preloadHelpTypes = preloadHelpTypes;
const getHelpTypeId = (help_type) => {
    return helpTypesCache[help_type] || null;
};
exports.getHelpTypeId = getHelpTypeId;
