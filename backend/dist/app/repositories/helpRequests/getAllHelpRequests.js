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
exports.getAllHelpRequests = void 0;
const connection_1 = __importDefault(require("../../connection"));
const getAllHelpRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`
    SELECT 
      help_requests.id AS id,
      help_requests.description,
      help_requests.created_at,
      help_requests.help_type_id,
      help_requests.req_date,
      help_requests.status,
      help_requests.title,
      help_requests.author_id,
      users.first_name AS author_first_name,
      users.last_name AS author_last_name,
      users.username AS author_username,
      users.address AS author_address,
      users.postcode AS author_postcode,
      users.longitude AS author_longitude,
      users.latitude AS author_latitude
    FROM 
      help_requests
    LEFT JOIN 
      users 
    ON 
      help_requests.author_id = users.id
  `);
    return rows;
});
exports.getAllHelpRequests = getAllHelpRequests;
