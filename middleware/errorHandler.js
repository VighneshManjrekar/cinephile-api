const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") console.log(err);
  const error = { ...err };
  error.message = err.message;
  error.name = err.name;

  // invalid mongoose id error
  if (error.name == "CastError") {
    error.message = `Invalid Resource Id`;
    new ErrorResponse(error.message, 404);
  }
  // duplicate value error
  if (error.code == 11000) {
    error.message = `Entered ${[Object.keys(error.keyPattern)]} already exists`;
    // if (Object.keys(error.keyPattern).length > 1) {
    //   error.message =
    //     "duplicate error message";
    // }
    error.status = 401;
    new ErrorResponse(error.message, error.status);
  }
  // jsonwebtoken error
  if (error.name == "JsonWebTokenError" || error.message == "jwt malformed") {
    error.message = "Invalid token";
    error.status = 401;
    new ErrorResponse(error.message, error.status);
  }

  res
    .status(error.status || 500)
    .json({ success: false, error: error.message || "Internal Server Error" });
};

module.exports = errorHandler;
