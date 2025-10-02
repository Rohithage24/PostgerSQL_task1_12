import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export const shopUpload = upload.fields([
  { name: "aadhaarFront", maxCount: 1 },
  { name: "aadhaarBack", maxCount: 1 },
  { name: "interiorPhoto", maxCount: 1 },
  { name: "exteriorPhoto", maxCount: 1 },
]);
