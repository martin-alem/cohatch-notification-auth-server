import express from "express";
import authorizeController from "./../controllers/authorizeController.js";
const authorizeRouter = express.Router();

authorizeRouter.get("/", [authorizeController]);

//Catch all exceptions thrown by this router
authorizeRouter.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    status: "fail",
    statusCode: error.statusCode,
    message: error.message,
  });
});

export default authorizeRouter;
