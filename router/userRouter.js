import express from "express";
import {usercreate , userAllget} from '../Controllers/userCon.js';
import {sendOtp , verifyOtp , completeSignup} from '../Controllers/otpCon.js'
import {sendOpt , verfiy , compSignup , authU} from "../Controllers/otpConer.js";

const router = express.Router();

router.post('/hello',usercreate)

router.get('/get',userAllget)


// router.post('/sendotp' , sendOtp);
// router.post('/verfiy' , verifyOtp);
// router.post('/signup',completeSignup);

router.post('/sendotp' , sendOpt);
router.post('/verfiy' , verfiy);
router.post('/signup',compSignup);
router.get('/valid', authU);


export default router;
