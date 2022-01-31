import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UserModel from "./../models/UserModel.js";
import ErrorHandler from "./../utils/ErrorHandler.js";
import { setCookie } from "./../utils/util.js";

async function loginController(req, res, next) {
  try {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) return next(new ErrorHandler(400, "Invalid bearer token"));
    const tokenId = bearerToken.split(" ")[1];

    const googleUser = await verify(tokenId);
    if (!googleUser) return next(new ErrorHandler(403, "Unauthorized user"));

    /**
     * Query the database to find if a user exist with the specified email address from google.com
     * If an email exist login user otherwise create a new record
     */
    const { email: googleEmail } = googleUser;
    let user = await UserModel.findOne({ email: googleEmail });

    if (!user) {
      user = await UserModel.create([googleUser]);
      user = user[0];
      if (!user) return next(new ErrorHandler(500, "Internal Server Error 1"));
    }
    const accessToken = generateAccessToken(user["_id"]);
    setCookie(res, "_access_token", accessToken, 5);
    res.status(201).json({
      status: "success",
      statusCode: 201,
      payload: user,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(500, "Internal Server Error 2"));
  }
}

/**
 * Verifies and decodes the jwt token
 * @param token jwt token
 * @returns a promise that resolves with a google user or undefined
 */
async function verify(token) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
      const { email, family_name: firstName, given_name: lastName, picture } = payload;
      if (email && lastName && firstName && picture) {
        const googleUser = { firstName, lastName, picture, email };
        return googleUser;
      }
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}

function generateAccessToken(userId) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "5h",
  });
  return accessToken;
}

export default loginController;
