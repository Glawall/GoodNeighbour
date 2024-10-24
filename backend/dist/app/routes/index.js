"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersController = __importStar(require("../controllers/users"));
const helpRequestsController = __importStar(require("../controllers/helpRequests"));
const helpOffersController = __importStar(require("../controllers/helpOffers"));
const helpTypesController = __importStar(require("../controllers/helpTypes"));
const commentsController = __importStar(require("../controllers/comments"));
router.get("/", (req, res, next) => {
    res.status(200).send({ message: "welcome to the Good Neighbour API" });
});
// * Users
router.get("/api/users", usersController.getAllUsers);
router.get("/api/users/:user_id", usersController.getByUserId);
router.delete("/api/users/:user_id", usersController.removeUser);
router.patch("/api/users/:user_id", usersController.updateUser);
router.post("/api/users", usersController.createUser);
// * Help requests
router.get("/api/help-requests", helpRequestsController.getAllHelpRequests);
router.get("/api/help-requests/:help_request_id", helpRequestsController.getByHelpRequestId);
router.get("/api/users/:user_id/help-requests", helpRequestsController.getByUserId);
router.post("/api/help-requests", helpRequestsController.createHelpRequest);
router.delete("/api/help-requests/:help_request_id", helpRequestsController.removeHelpRequest);
router.patch("/api/help-requests/:help_request_id", helpRequestsController.updateHelpRequest);
// * Help Offers
router.get("/api/users/:user_id/help-offers", helpOffersController.getByUserId);
router.get("/api/help-requests/:help_request_id/help-offers", helpOffersController.getByHelpRequestId);
router.get("/api/help-requests/:help_request_id/help-offers/:helper_id", helpOffersController.getByHelpRequestIdAndHelperId);
router.post("/api/users/:user_id/help-offers", helpOffersController.createHelpOffer);
router.patch("/api/help-requests/:help_request_id/help-offers/:helper_id", helpOffersController.updateHelpOffer);
router.delete("/api/help-requests/:help_request_id/help-offers/:helper_id", helpOffersController.removeHelpOffer);
// * Comments
router.get("/api/help-requests/:help_request_id/comments", commentsController.getCommentsByRequestId);
router.get("/api/help-requests/:help_request_id/comments/:comment_id", commentsController.getCommentById);
router.post("/api/help-requests/:help_request_id/comments/:parent_id?", commentsController.createComment);
router.patch("/api/help-requests/:help_request_id/comments/:comment_id", commentsController.updateComment);
router.delete("/api/help-requests/:help_request_id/comments/:comment_id", commentsController.removeComment);
// // * Types
router.get("/api/help-types", helpTypesController.getAllHelpTypes);
exports.default = router;
