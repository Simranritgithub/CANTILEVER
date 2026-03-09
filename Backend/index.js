import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './Config/db.js';
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




app.listen(()=>console.log(`server running on ${PORT}`));