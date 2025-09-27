import express from "express";
import {usercreate} from '../Controllers/userCon.js';
const router = express.Router();

router.post('/hello',usercreate)



export default router;
