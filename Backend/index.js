import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './Config/db.js';
import userroutes from './Routes/user.routes.js'
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend Vite dev URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
// Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth",userroutes);




app.listen(PORT, () => console.log(`Server running on ${PORT}`));