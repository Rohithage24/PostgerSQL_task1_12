import express from "express";
import http from 'http';
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"
import shopRouter from "./router/shopRouter.js";
import adminRouter from "./router/adminRouter.js"

const app = express();


const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter)

app.use('/api/shop',shopRouter)


app.use('/api/admin',adminRouter)



export default server;
