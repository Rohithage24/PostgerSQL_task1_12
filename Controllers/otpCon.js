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






// import prisma from '../db/db.config.js'
// import { createToken, verifyToken } from '../auth/authUser.js'




// export const sendOpt = async (req, res) => {
//   const { Mobile } = req.body
//   console.log(Mobile)

//   if (!/^\d{10}$/.test(Mobile)) {
//     return res
//       .status(400)
//       .json({ status: 400, message: 'invilide number not 10 -digit' })
//   }
//   let userfind = await prisma.mobileLogin.findUnique({ where: { Mobile } })

//   const otp = Math.floor(1000 + Math.random() * 9999).toString()

//   if (userfind) {
//     userfind = await prisma.mobileLogin.update({
//       where: { Mobile },
//       data: { otp }
//     })
//   } else {
//     userfind = await prisma.mobileLogin.create({
//       data: { Mobile, otp }
//     })
//   }

//   console.log(otp)

//   return res
//     .status(201)
//     .json({ status: 201, massage: 'otp send Sucessfully..' })
// }

// export const verfiy = async (req, res) => {
//   const { Mobile, otp } = req.body

//   let userfind = await prisma.mobileLogin.findUnique({ where: { Mobile } })

//   if (!userfind) {
//     return res.status(301).send('Mobile is invilide.')
//   }

//   if (userfind.otp != otp) {
//     return res.status(401).send('OTP does not match')
//   }

//   if (userfind.Name != null && userfind.password != null) {
//     const token = createToken(userfind)
//     res.cookie(token)
//     return res.json({
//       status: 201,
//       message: 'Signup successful',
//       data: userfind,
//       cookie: token
//     })
//   }

//   return res
//     .status(201)
//     .json({
//       status: 201,
//       massage: 'your login is sucessfully, now complete your profile'
//     })
// }

// export const compSignup = async (req, res) => {
//   const { Mobile, Name , userName , password } = req.body

//   const user = await prisma.mobileLogin.findUnique({ where: { Mobile } })

//   if (!user) {
//     return res.status(404).json({ status: 404, message: 'User not found' })
//   }

//   const updatedUser = await prisma.mobileLogin.update({
//     where: { Mobile },
//     data: { Name , 
//       userName :userName,
//       password :password
//      }
//   })
//   const token = createToken(req.body)
//   res.cookie(token)
//   return res.json({
//     status: 201,
//     message: 'Signup successful',
//     data: updatedUser,
//     cookie: token
//   })
// }



// export const userLogin= async(req , res) =>{
  

// }

// export const authU = (req, res) => {
//   const token = req.cookies.token // or req.headers.authorization
//   console.log(token)

//   const user = verifyToken(token)
//   console.log(user)

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid or expired token' })
//   } else {
//     res.json({ user: user })
//   }
// }
