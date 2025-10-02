import prisma from '../db/db.config.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tmpDir = path.join(process.cwd(), 'uploads', 'tmp');
    fs.mkdirSync(tmpDir, { recursive: true });
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}_${file.fieldname}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME.includes(file.mimetype)) return cb(new Error('Invalid file type'));
  cb(null, true);
}

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter
}).fields([
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'interiorPhoto', maxCount: 1 },
  { name: 'exteriorPhoto', maxCount: 1 }
]);

function sanitizeDigits(str = '') {
  return String(str).replace(/\D/g, '');
}

function moveFile(tmpPath, shopId, filename) {
  const destDir = path.join(process.cwd(), 'uploads', 'shops', String(shopId));
  fs.mkdirSync(destDir, { recursive: true });
  const destPath = path.join(destDir, filename);
  fs.renameSync(tmpPath, destPath);
  return path.relative(process.cwd(), destPath).replace(/\\/g, '/');
}

export const shopCreate = async (req, res) => {
  try {
    // multer populates req.body and req.files
    const { shopName, customerCare, address, pincode } = req.body;
    const phone = sanitizeDigits(customerCare);
    const pin = sanitizeDigits(pincode);

    if (!shopName || !phone || !address || !pin) {
      return res.status(400).json({ status: 400, message: 'All fields are required' });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ status: 400, message: 'Customer care must be a valid 10-digit number' });
    }
    if (!/^\d{6}$/.test(pin)) {
      return res.status(400).json({ status: 400, message: 'Pincode must be a valid 6-digit number' });
    }

    if (
      !req.files ||
      !req.files.aadharFront ||
      !req.files.aadharBack ||
      !req.files.interiorPhoto ||
      !req.files.exteriorPhoto
    ) {
      return res.status(400).json({ status: 400, message: 'All four photos are required' });
    }

    // Create shop record with placeholders for file paths
    const created = await prisma.shop.create({
      data: {
        ShopName: shopName,
        CustomerCare: phone,
        Address: address,
        Pincode: pin,
        AadharFront: '',
        AadharBack: '',
        InteriorPhoto: '',
        ExteriorPhoto: ''
      }
    });

    const shopId = created.id;

    const filePaths = {};
    for (const field of ['aadharFront', 'aadharBack', 'interiorPhoto', 'exteriorPhoto']) {
      const file = req.files[field][0];
      const relPath = moveFile(file.path, shopId, file.filename);
      filePaths[field] = relPath;
    }

    const updated = await prisma.shop.update({
      where: { id: shopId },
      data: {
        AadharFront: filePaths.aadharFront,
        AadharBack: filePaths.aadharBack,
        InteriorPhoto: filePaths.interiorPhoto,
        ExteriorPhoto: filePaths.exteriorPhoto
      }
    });

    return res.status(201).json({ status: 201, message: 'Shop created', data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ status: 400, message: error.message });
    }
    return res.status(500).json({ status: 500, message: 'Server error', error: String(error) });
  }
};

export const shopAllGet = async (req, res) => {
  try {
    const data = await prisma.shop.findMany();
    if (!data || data.length === 0) {
      return res.status(204).json({ status: 204, message: 'No shops found', data: [] });
    }
    return res.status(200).json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Server error', error: String(error) });
  }
};
