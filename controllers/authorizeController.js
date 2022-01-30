import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import UserModel from "./../models/UserModel.js";

async function authorizeController(req, res, next) {
  try {
    const { _access_token } = req.cookies;
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
      const jwtPayLoad = jwt.verify(_access_token, JWT_SECRET);
      const { userId } = jwtPayLoad;
      const user = await UserModel.findOne({ _id: userId });
      if (!user) return next(new ErrorHandler(403, "User not found"));
      res.status(200).json({ status: "success", statusCode: 200, payload: user });
    } catch (error) {
      console.error(error);
      next(new ErrorHandler(403, "Invalid access token"));
    }
  } catch (error) {}
}

export default authorizeController;
