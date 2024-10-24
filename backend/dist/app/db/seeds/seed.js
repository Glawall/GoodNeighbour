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
const pg_format_1 = __importDefault(require("pg-format"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("../../connection"));
const schemaFiles = [
    "users.sql",
    "help_types.sql",
    "help_requests.sql",
    "help_offers.sql",
    "comments.sql",
];
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.query(`
            DROP TABLE IF EXISTS comments CASCADE;
            DROP TABLE IF EXISTS help_offers CASCADE;
            DROP TABLE IF EXISTS help_requests CASCADE;
            DROP TABLE IF EXISTS help_types CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);
        for (const file of schemaFiles) {
            const filePath = path_1.default.join(`${__dirname}/../../db/schema`, file);
            const sql = (0, fs_1.readFileSync)(filePath, "utf-8");
            yield connection_1.default.query(sql);
        }
    }
    catch (error) {
        console.log(error);
    }
});
const seed = (_a) => __awaiter(void 0, [_a], void 0, function* ({ usersData, typesData, helpRequestsData, commentsData, helpOffersData, }) {
    try {
        yield createTables();
        const insertUsersStr = (0, pg_format_1.default)("INSERT INTO users (username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude) VALUES %L;", usersData.map(({ username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude, }) => [
            username,
            email,
            avatar_url,
            age,
            first_name,
            last_name,
            about,
            address,
            postcode,
            phone_number,
            additional_contacts,
            help_radius,
            longitude,
            latitude,
        ]));
        yield connection_1.default.query(insertUsersStr);
        const insertHelpTypeDataStr = (0, pg_format_1.default)("INSERT INTO help_types (name, description) VALUES %L", typesData.map(({ name, description }) => [name, description]));
        yield connection_1.default.query(insertHelpTypeDataStr);
        const insertHelpRequestsDataStr = (0, pg_format_1.default)("INSERT INTO help_requests (title, author_id, help_type_id, description, created_at, req_date, status) VALUES %L", helpRequestsData.map(({ title, author_id, help_type_id, description, created_at, req_date, status, }) => [
            title,
            author_id,
            help_type_id,
            description,
            created_at,
            req_date,
            status,
        ]));
        yield connection_1.default.query(insertHelpRequestsDataStr);
        const insertHelpOffersDataStr = (0, pg_format_1.default)("INSERT INTO help_offers (helper_id, help_request_id, status) VALUES %L", helpOffersData.map(({ helper_id, help_request_id, status }) => [
            helper_id,
            help_request_id,
            status,
        ]));
        yield connection_1.default.query(insertHelpOffersDataStr);
        const parentCommentsData = commentsData.filter((comment) => comment.parent_id === null);
        const insertParentCommentsStr = (0, pg_format_1.default)("INSERT INTO comments (author_id, help_request_id, created_at, description) VALUES %L RETURNING id, description;", parentCommentsData.map(({ author_id, help_request_id, created_at, description }) => [
            author_id,
            help_request_id,
            created_at,
            description,
        ]));
        const parentCommentsResult = yield connection_1.default.query(insertParentCommentsStr);
        const parentComments = parentCommentsResult.rows;
        const childCommentsData = commentsData.filter((comment) => comment.parent_id !== null);
        const insertChildCommentsStr = (0, pg_format_1.default)("INSERT INTO comments (author_id, help_request_id, parent_id, created_at, description) VALUES %L", childCommentsData.map(({ author_id, help_request_id, parent_id, created_at, description, }) => [author_id, help_request_id, parent_id, created_at, description]));
        if (childCommentsData.length > 0) {
            yield connection_1.default.query(insertChildCommentsStr);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = seed;
