import prisma from "../db/db.config.js";
import cloudinary from "../middleware/cloudinary.js";

// Upload helper
export const uploadToCloudinary = (fileBuffer, folder, fileName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: fileName, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// KYC upload controller
export const shopCreate  = async (req, res) => {
  try {
    const { mobile, ShopName, CustomerCare, Address, Pincode } = req.body;

    const user = await prisma.mobileLogin.findUnique({
      where: { Mobile: mobile },
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Upload files to Cloudinary
    const aadhaarFront = req.files["aadhaarFront"]
      ? await uploadToCloudinary(req.files["aadhaarFront"][0].buffer, "ShopKYC", `aadhaarFront_${mobile}`)
      : null;

    const aadhaarBack = req.files["aadhaarBack"]
      ? await uploadToCloudinary(req.files["aadhaarBack"][0].buffer, "ShopKYC", `aadhaarBack_${mobile}`)
      : null;

    const interiorPhoto = req.files["interiorPhoto"]
      ? await uploadToCloudinary(req.files["interiorPhoto"][0].buffer, "ShopKYC", `interiorPhoto_${mobile}`)
      : null;

    const exteriorPhoto = req.files["exteriorPhoto"]
      ? await uploadToCloudinary(req.files["exteriorPhoto"][0].buffer, "ShopKYC", `exteriorPhoto_${mobile}`)
      : null;

    // Save in DB
    const shopData = await prisma.shopRegister.create({
      data: {
        ShopName,
        CustomerCare,
        userId: user.Id,
        Mobile: user.Mobile,
        Address,
        Pincode,
        aadhaarFront,
        aadhaarBack,
        interiorPhoto,
        exteriorPhoto,
      },
    });

    res.json({
      status: "success",
      message: "KYC uploaded successfully to Cloudinary",
      data: shopData,
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err.message });
  }
};



export const shopAllGet = async (req, res) => {
  try {
    const data = await prisma.shopRegister.findMany();
    if (!data || data.length === 0) {
      return res.status(204).json({ status: 204, message: 'No shops found', data: [] });
    }
    return res.status(200).json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Server error', error: String(error) });
  }
};