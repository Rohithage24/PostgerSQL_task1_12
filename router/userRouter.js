import express from "express";
import {usercreate} from '../Controllers/userCon.js';
const router = express.Router();

router.get('/hello',usercreate)



export default router;
