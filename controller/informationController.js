const { Informations, Service } = require("../models");


module.exports = class InformationController{
  static async getBanner(req,res,next){
    try {
      const data = await Informations.findAll({
        attributes: {exclude : ["updatedAt", "createdAt"]}
      });

      res.status(200).json(
        {
          "status": 0,
          "message": "Sukses",
          "data": { data }
        }
      )
  } catch (error) {
      next(error)
  }
  }

  static async getService(req,res,next){
    try {
      const data = await Service.findAll({
        attributes: {exclude : ["updatedAt", "createdAt"]}
      });

      res.status(200).json(
        {
          "status": 0,
          "message": "Sukses",
          "data": { data }
        }
      )
  } catch (error) {
      next(error)
  }
  }
}

