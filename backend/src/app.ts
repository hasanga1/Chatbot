import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";
import appRouter from './routes/index.js';
import cors from 'cors';

config();

const app = express();

// middlewares
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser(process.env.COOCKIE_SECRET));

//remove it in deplyoment
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;