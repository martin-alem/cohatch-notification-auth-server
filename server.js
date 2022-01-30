import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./database/connection.js";

import loginRouter from "./routes/loginRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import authorizeRouter from "./routes/authorizeRouter.js";

//Read environment variable from .env
dotenv.config();

const app = express();

//Express Cors Configuration
const corsOptions = {
  origin: process.env.ALLOWED_DOMAIN,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", , "Access-Control-Allow-Origin"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser());
app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

//Login endpoint
app.use("/api/v1/login", loginRouter);

//Logout endpoint
app.use("/api/v1/logout", logoutRouter);

//Authorization endpoint
app.use("/api/v1/authorize", authorizeRouter);

//Ping routes to check server status
app.get("/api/ping", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server up and running",
  });
});

//Bad route handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: `${req.url} resource not found on this server`,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Authentication Server listening on port " + PORT);
});
