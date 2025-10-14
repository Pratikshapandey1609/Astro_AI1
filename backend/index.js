import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config(); //Load env variables

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json()); // parse json 
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // secure heders 

// cors 
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET", "POST", "PUT" , "DELETE"],
    credentials : true
}));

// routes 
app.use("/api" , userRoutes) //  http://localhost:4024/api/
//  http://localhost:4024/api/signup 
// login //  http://localhost:4024/api/login

// for updating user profile 
app.use("/api/users" , userRoutes) // http://localhost:4024/api/users

const PORT = process.env.PORT | 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

