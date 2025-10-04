import express from "express";
import { shopConform , PandingReq , completeReq} from "../Controllers/Abmin/adminshopCon.js";
const router = express.Router();

router.post('/shopKyc' , shopConform)
router.get('/panding' , PandingReq)
router.get('/completeList' , completeReq)


export default router;