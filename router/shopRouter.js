import express from "express";
import { shopCreate  , shopAllGet} from "../Controllers/shopRegister.js";
import { shopUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Directly pass shopUpload as middleware
router.post("/shopRegister", shopUpload, shopCreate );
router.get('/allShop', shopAllGet);
export default router;
