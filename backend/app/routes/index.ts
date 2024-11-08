import express from "express";
const router = express.Router();

import * as usersController from "../controllers/users";
import * as helpRequestsController from "../controllers/helpRequests";
import * as helpOffersController from "../controllers/helpOffers";
import * as helpTypesController from "../controllers/helpTypes";
import * as commentsController from "../controllers/comments";

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
router.get(
  "/api/help-requests/:help_request_id",
  helpRequestsController.getByHelpRequestId
);
router.get(
  "/api/users/:user_id/help-requests",
  helpRequestsController.getByUserId
);
router.post("/api/help-requests", helpRequestsController.createHelpRequest);
router.delete(
  "/api/help-requests/:help_request_id",
  helpRequestsController.removeHelpRequest
);
router.patch(
  "/api/help-requests/:help_request_id",
  helpRequestsController.updateHelpRequest
);

// * Help Offers
router.get("/api/users/:user_id/help-offers", helpOffersController.getByUserId);
router.get(
  "/api/help-requests/:help_request_id/help-offers",
  helpOffersController.getByHelpRequestId
);
router.get(
  "/api/help-requests/:help_request_id/help-offers/:helper_id",
  helpOffersController.getByHelpRequestIdAndHelperId
);
router.post(
  "/api/users/:user_id/help-offers",
  helpOffersController.createHelpOffer
);
router.patch(
  "/api/help-requests/:help_request_id/help-offers/:helper_id",
  helpOffersController.updateHelpOffer
);
router.delete(
  "/api/help-requests/:help_request_id/help-offers/:helper_id",
  helpOffersController.removeHelpOffer
);

// * Comments

router.get(
  "/api/help-requests/:help_request_id/comments",
  commentsController.getCommentsByRequestId
);

router.get(
  "/api/help-requests/:help_request_id/comments/:comment_id",
  commentsController.getCommentById
);
router.post(
  "/api/help-requests/:help_request_id/comments/:parent_id?",
  commentsController.createComment
);
router.patch(
  "/api/help-requests/:help_request_id/comments/:comment_id",
  commentsController.updateComment
);

router.delete(
  "/api/help-requests/:help_request_id/comments/:comment_id",
  commentsController.removeComment
);

// // * Types
router.get("/api/help-types", helpTypesController.getAllHelpTypes);
router.get(
  "/api/help-types/:help_type_id",
  helpTypesController.getByHelpTypeId
);

export default router;
