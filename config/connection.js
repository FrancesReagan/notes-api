import mongoose from "mongoose";
import dotenv from "dotenv";

// step 1. load environment variables from .env//
dotenv.config();

// step 2. connect to MongoDB using the connection string from .env---it is like dialing a phone number to connect to my database//
mongoose.connect(process.env.MONGO_URI);

// step 3. exporting the connection so other files can utilize it---like sharing my phone connection with buddies.//
export default mongoose.connection;