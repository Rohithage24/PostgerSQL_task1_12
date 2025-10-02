import express from 'express';
import { upload, shopCreate, shopAllGet } from '../Controllers/shopRegister.js';

const router = express.Router();

// Shop register (with file upload)
router.post('/register', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    shopCreate(req, res);
  });
});

// Get all shops
router.get('/all', shopAllGet);

export default router;
