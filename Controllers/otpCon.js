import prisma from "../db/db.config.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Step 1: Send OTP
export const sendOtp = async (req, res) => {
  const { Mobile } = req.body;

  // validet number
  if (!/^\d{10}$/.test(Mobile)) {
    return res.status(400).json({ status: 400, message: "invilide number not 10 -digit" });
  }

  let user = await prisma.mobileLogin.findUnique({ where: { Mobile } });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (user) {

    user = await prisma.mobileLogin.update({
      where: { Mobile },
      data: { otp }
    });
  } else {

    user = await prisma.mobileLogin.create({
      data: { Mobile, otp }
    });
  }

  console.log(otp);
  


//   await client.messages.create({
//     body: `Your OTP is ${otp}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: `+91${Mobile}`,
//   });

  return res.json({ status: 200, message: "OTP sent successfully" });
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { Mobile, otp } = req.body;

  const user = await prisma.mobileLogin.findUnique({ where: { Mobile } });

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ status: 400, message: "Invalid OTP" });
  }

  return res.json({ status: 200, message: "OTP verified, please complete signup" });
};


export const completeSignup = async (req, res) => {
  const { Mobile, Name } = req.body;

  const user = await prisma.mobileLogin.findUnique({ where: { Mobile } });

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  const updatedUser = await prisma.mobileLogin.update({
    where: { Mobile },
    data: { Name }
  });

  return res.json({
    status: 201,
    message: "Signup successful",
    data: updatedUser
  });
};



