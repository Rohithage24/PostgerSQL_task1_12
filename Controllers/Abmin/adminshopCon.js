import prisma from '../../db/db.config.js'

export const shopConform = async (req, res) => {
  try {
    const { Status, Gmail, Mobile } = req.body
    // console.log(req.body);

    let shopOwn = await prisma.shopRegister.findFirst({
      where: {
        Gmail,
        Mobile
      }
    })

    if (shopOwn && shopOwn.Status === 'Panding') {
      shopOwn = await prisma.shopRegister.update({
        where: { Gmail },
        data: { Status }
      })

      //   console.log(shopOwn);
      return res
        .status(200)
        .json({ data: shopOwn.Status, message: 'Complete shop registation' })
    } else {
      return res
        .status(404)
        .json({ message: 'Shop not found or not in pending state' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}

export const PandingReq = async (req, res) => {
  try {
    const penReq = await prisma.shopRegister.findMany({
      where: {
        Status: 'Panding'
      }
    })

    if (!penReq || penReq.length === 0) {
      return res.status(401).json({ message: 'No pending request for shop.' })
    }

    return res.status(200).json({ data: penReq, message: 'All Panding List' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}



export const completeReq = async (req, res) => {
  try {
    const comReq = await prisma.shopRegister.findMany({
      where: {
        Status: 'Complete'
      }
    })

    if (!comReq || comReq.length === 0) {
      return res.status(401).json({ message: 'No complete request for shop.' })
    }

    return res.status(200).json({ data: comReq, message: 'All complete List' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
