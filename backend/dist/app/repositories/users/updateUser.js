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
exports.updateUser = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateUser = (id, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, about, address, postcode, phone_number, additional_contacts, help_radius = 0, } = updateBody;
    const setClause = [];
    const values = [];
    if (email) {
        setClause.push(`email = $${values.push(email)}`);
    }
    if (about) {
        setClause.push(`about = $${values.push(about)}`);
    }
    if (address) {
        setClause.push(`address = $${values.push(address)}`);
    }
    if (postcode) {
        setClause.push(`postcode = $${values.push(postcode)}`);
    }
    if (phone_number) {
        setClause.push(`phone_number = $${values.push(phone_number)}`);
    }
    if (additional_contacts) {
        setClause.push(`additional_contacts = $${values.push(additional_contacts)}`);
    }
    if (help_radius) {
        setClause.push(`help_radius = $${values.push(help_radius)}`);
    }
    if (setClause.length === 0) {
        const { rows } = yield connection_1.default.query("SELECT id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius FROM users WHERE id = $1", [id]);
        return rows[0];
    }
    const query = `
    UPDATE users
    SET ${setClause.join(", ")}
    WHERE id = $${values.length + 1}
    RETURNING id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius;
  `;
    values.push(id);
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.updateUser = updateUser;
