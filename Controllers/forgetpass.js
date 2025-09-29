import prisma from '../db/db.config.js'
import { createToken, verifyToken } from '../auth/authUser.js'


// export const forgatPassword = async(req , res) =>{
//      const {userName } = req.body;

//      let userfind = await prisma.mobileLogin.findFirst({where:{ userName:userName}})

//      if(!userfind){
//      return res.status(404).json({ status: 404, message: 'User not found' })

//      }
//      const otp = Math.floor(1000 + Math.random() * 9999).toString()
//      userfind = await prisma.mobileLogin.update({
//       where:{userName: userName},
//       data:{
//         otp
//       }
//      })
//        const digit = userfind.Mobile.slice(-2);
//        console.log(digit);
//        console.log(userfind);

//     return res.status(201).json({status:201 , massage:`otp send of this mobile number ******${digit}`})

// }

export const forgatPassword = async (req, res) => {
  const { userName } = req.body

  let userfind = await prisma.mobileLogin.findUnique({
    where: { userName: userName }
  })

  if (!userfind) {
    return res.status(404).json({ status: 404, message: 'User not found' })
  }
  const otp = Math.floor(1000 + Math.random() * 9999).toString()

  userfind = await prisma.mobileLogin.update({
    where: { userName: userName }, // <-- CORRECT PRISMA SYNTAX
    data: {
      otp
    }
  })
  const digit = userfind.Mobile.slice(-2)
  console.log(digit)
  console.log(userfind)

  return res
    .status(201)
    .json({
      status: 201,
      massage: `otp send of this mobile number ******${digit}`
    })
}

export const forgetOTPverfiy = async (req, res) => {
  const { Mobile, otp } = req.body

  let userfind = await prisma.mobileLogin.findUnique({ where: { Mobile } })

  if (!userfind) {
    return res.status(301).send('Mobile is invilide.')
  }

  if (userfind.otp != otp) {
    return res.status(401).send('OTP does not match')
  }
  
  return res.status(201).json({status:201 , massage: "Create a new password .."})
}


export const CreateNewPass= async( req ,res)=>{
  try {
      const {Mobile , NewPassword , ComPassword} = req.body;
  let userfind = await prisma.mobileLogin.findUnique({ where: { Mobile } })

  if(NewPassword === ComPassword){
    userfind = await prisma.mobileLogin.update({
        where:{Mobile},
        data:{
            password:NewPassword
        }
    })

    return res.status(201).json({massage:"Password change sucessfully.."});
  }else{
    return res.status(500).json({massage:"Password not Match.."})
  }

  } catch (error) {
    return res.status(500).json({massage:error})
    
  }

}

