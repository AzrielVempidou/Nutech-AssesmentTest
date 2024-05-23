const { verifyToken } = require("../helpers/jwt");
const { Membership } = require("../models");
const authentication = async(req,res,next) => {
  try {
   
    const { access_token } = req.headers
    

    if (!access_token) {
      throw { name: "Unauthorized", message: "Invalid Token"}
    }
    //2. Verifikasi token dan simpan kedalam data nke variable
    const data = verifyToken(access_token)
    //3. validasi apakah user ada atau tidak
    const user = await Membership.findByPk(data.id)
    if (!user) {
      throw { name: "Unauthorized", message: "Invalid Token"}
    }
    req.user = {
      id: user.id,
      email: user.email,
    }
    next()
    
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = authentication
