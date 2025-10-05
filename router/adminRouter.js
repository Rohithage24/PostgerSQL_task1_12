import express from "express";
import { shopConform , PandingReq  } from "../Controllers/Abmin/adminshopCon.js";
const router = express.Router();

router.post('/shopKyc' , shopConform)
router.get('/panding/:status' , PandingReq)
// router.get('/completeList' , completeReq)



export default router;