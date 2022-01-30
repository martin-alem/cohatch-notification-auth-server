import express from "express";
import loginController from "./../controllers/loginController.js"
const loginRouter = express.Router();

loginRouter.post("/", [loginController]);

//Catch all exceptions thrown by this router
loginRouter.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    status: "fail",
    statusCode: error.statusCode,
    message: error.message,
  });
});

export default loginRouter;
