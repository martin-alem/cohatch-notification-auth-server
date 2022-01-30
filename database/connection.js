import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
  const options = { keepAlive: true, keepAliveInitialDelay: 300000 };
  const url = process.env.DB_URL;
  try {
    mongoose.connection.on("connecting", () => console.log("Connecting to Mongodb..."));
    mongoose.connection.on("connected", () => console.log("Connected to COhatch Database successfully"));
    return await mongoose.connect(url, options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const db = connectToDatabase();
export default db;
