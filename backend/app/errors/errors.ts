export const errors = {
  AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "User is not authorised",
  },
  HELP_REQUEST_VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid help request id provided",
  },
  HELP_OFFER_VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid help offer id provided",
  },
  USER_VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid user id provided",
  },
  COMMENT_VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid comment id provided",
  },
  HELP_TYPE_VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid help type id provided",
  },
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Invalid input provided",
  },
  MANDATORY_FIELD_ERROR: {
    statusCode: 400,
    message: "You need to fill in the mandatory field",
  },
  REPOSITORY_ERROR: {
    statusCode: 500,
    message: "Internal server error",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User was not found",
  },
  HELP_REQUEST_NOT_FOUND: {
    statusCode: 404,
    message: "Help request was not found",
  },
  HELP_OFFER_NOT_FOUND: {
    statusCode: 404,
    message: "Help offer was not found",
  },
  COMMENT_NOT_FOUND: {
    statusCode: 404,
    message: "Comment was not found",
  },
  HELP_TYPE_NOT_FOUND: {
    statusCode: 404,
    message: "Help type was not found",
  },
  COMMENT_UPDATE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to update this comment",
  },
  HELP_REQUEST_UPDATE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to update this help request",
  },
  HELP_OFFER_UPDATE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to update this help offer",
  },
  COMMENT_DELETE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to delete this comment",
  },
  HELP_REQUEST_DELETE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to delete this help request",
  },
  HELP_OFFER_DELETE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to delete this help offer",
  },
  USER_DELETE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to delete this user",
  },
  USER_UPDATE_AUTHORISATION_ERROR: {
    statusCode: 401,
    message: "You are not authorised to update this user",
  },
};
