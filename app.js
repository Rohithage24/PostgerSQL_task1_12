import express from "express";
import http from 'http';
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"
<<<<<<< HEAD
import shopRouter from "./router/shopRouter.js";
=======
import shopRoutes from './routes/shopRoutes.js';
>>>>>>> origin/shopRegister

const app = express();


const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter)

<<<<<<< HEAD
app.use('/api/shop',shopRouter)

=======
app.use('/api/shops', shopRoutes);
>>>>>>> origin/shopRegister

export default server;
