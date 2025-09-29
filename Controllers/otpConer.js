import prisma from '../db/db.config.js'
import { createToken, verifyToken } from '../auth/authUser.js'


export const sendOpt = async (req, res) => {
  const { Mobile, Name, userName, password } = req.body

  console.log(Mobile)

  if (!/^\d{10}$/.test(Mobile)) {
    return res
      .status(400)
      .json({ status: 400, message: 'invilide number not 10 -digit' })
  }
  let userNamefind = await prisma.mobileLogin.findFirst({ where: { userName } })

  if (userNamefind) {
    return res
      .status(401)
      .json({ status: 401, massage: 'This user name already rejister' })
  }

  const otp = Math.floor(1000 + Math.random() * 9999).toString()

  userNamefind = await prisma.mobileLogin.create({
    data: {
      Name,
      userName,
      password,
      Mobile,
      otp
    }
  })

  // if (userfind) {
  //   userfind = await prisma.mobileLogin.update({
  //     where: { Mobile },
  //     data: { otp }
  //   })
  // } else {
  //   userfind = await prisma.mobileLogin.create({
  //     data: { Mobile, otp }
  //   })
  // }

  console.log(otp)

  return res
    .status(201)
    .json({ status: 201, massage: 'otp send Sucessfully..' })
}

export const verfiy = async (req, res) => {
  const { Mobile, otp } = req.body

  let userfind = await prisma.mobileLogin.findUnique({ where: { Mobile } })

  if (!userfind) {
    return res.status(301).send('Mobile is invilide.')
  }

  if (userfind.otp != otp) {
    return res.status(401).send('OTP does not match')
  }

  if (userfind.Name != null && userfind.password != null) {
    const token = createToken(userfind)
    res.cookie(token)
    return res.json({
      status: 201,
      message: 'Signup successful',
      data: userfind,
      cookie: token
    })
  }

  return res.status(201).json({
    status: 201,
    massage: 'your login is sucessfully'
  })
}

// export const compSignup = async (req, res) => {
//   const {  userName , password } = req.body
//   console.log(req.body);

//   const user = await prisma.mobileLogin.findFirst({ where: { userName } })

//   if (!user) {
//     return res.status(404).json({ status: 404, message: 'User not found' })
//   }

// if (user.userName==userName && user.password==password) {
//    const token = createToken(user)
//   res.cookie(token)
//   return res.json({
//     status: 201,
//     message: 'Signup successful',
//     data: updatedUser,
//     cookie: token
//   })

// }

// }

// forgatPassword

export const compSignup = async (req, res) => {
  const { userName, password } = req.body
  console.log(req.body)
  const user = await prisma.mobileLogin.findFirst({ where: { userName } })

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' })
  }

  if (user.userName === userName && user.password === password) {
    const token = createToken(user)

    res.cookie('token', token, {
      httpOnly: true,
    })

    return res.json({
      status: 201,
      message: 'Login successful',
      data: user,
      cookie: token
    })
  } else {
    return res.status(401).json({ status: 401, message: 'Invalid credentials' })
  }
}


export const authU = (req, res) => {
  const token = req.cookies.token // or req.headers.authorization
  console.log(token)

  const user = verifyToken(token)
  console.log(user)

  if (!user) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  } else {
    res.json({ user: user })
  }
}
