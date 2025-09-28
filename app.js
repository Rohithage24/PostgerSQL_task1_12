import express from "express";
import http from 'http';
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"

const app = express();


const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter)


export default server;
