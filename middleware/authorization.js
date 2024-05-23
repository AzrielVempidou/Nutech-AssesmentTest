const { Membership } = require("../models");

const authorization = async(req,res,next) => {
  try {
    const userId = +req.user.id
    const member = await Membership.findByPk(userId)
    if(!member) throw {name: "NotFound", message : "Membership Not found"}

    console.log(member.id,">>>",req.user);
    if (member.id !== userId ) {
      throw{ name: "Forbidden", message:"Forbidden Access"}
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorization