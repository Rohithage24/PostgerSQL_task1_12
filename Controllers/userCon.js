import prisma from '../db/db.config.js'

export const usercreate = async (req, res) => {
  let { Name, Mobile } = req.body;
  console.log(req.body);

  Mobile = parseInt(Mobile, 10);

  if (isNaN(Mobile)) {
    return res.status(400).json({ status: 400, message: "Mobile must be a number" });
  }

  const userfind = await prisma.user.findUnique({
    where: { Mobile }
  });

  if (userfind) {
    return res.json({ status: 400, message: "User already has an account" });
  }

  const userCreate = await prisma.user.create({
    data: {
      Mobile,
      Name
    }
  });

  return res.status(201).json({ status: 201, message: "User created", data: userCreate });
};



// export const usercreate = async (req, res) => {
//   const { Name, Mobile} = req.body;
//   console.log(req.body);
  
//   const userfind = await prisma.user.findUnique({
//     where:{
//         Mobile:Mobile
//     }
//   });

//   if(userfind){
//     return res.json({ status : 400 , massage :"User is already account"})
//   }

//   const userCreate = await prisma.user.create({
//     data:{
//         Mobile:Mobile,
//     Name:Name
//     }
//   })
// }
