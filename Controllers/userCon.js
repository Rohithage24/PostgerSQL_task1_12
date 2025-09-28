import prisma from '../db/db.config.js'

export const usercreate = async (req, res) => {
  const { Name, Mobile } = req.body;

  if (!/^\d{10}$/.test(Mobile)) {
    return res.status(400).json({ status: 400, message: "Mobile must be a valid 10-digit number" });
  }

  const userfind = await prisma.user.findUnique({
    where: { Mobile }
  });

  if (userfind) {
    return res.json({ status: 400, message: "User already has an account" });
  }

  const userCreate = await prisma.user.create({
    data: { Name, Mobile }
  });

  return res.status(201).json({ status: 201, message: "User created", data: userCreate });
};


export const userAllget = async(req ,res)=>{
   
    try {
        const data = await prisma.user.findMany({});

        if (!data) {
            return res.status(301).message("Datase is Empty...");
            
        }

        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(501).send(error);
    }

}
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
