import ErrorHandler from "../utils/ErrorHandler.js";

function logoutController(req, res, next) {
  try {
    res.clearCookie("_access_token");
    res.status(204).json({ status: "success", statusCode: 204 });
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
  }
}

export default logoutController;
