import express from "express";
import logoutController from "./../controllers/logoutController.js";
const logoutRouter = express.Router();

logoutRouter.post("/", [logoutController]);

//Catch all exceptions thrown by this router
logoutRouter.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    status: "fail",
    statusCode: error.statusCode,
    message: error.message,
  });
});

export default logoutRouter;
