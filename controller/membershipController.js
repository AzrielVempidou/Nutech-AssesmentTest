const { membership } = require("../models");
const { comparePass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

module.exports = class membershipController{
  static async register(req,res,next){
    try {
      const { email, password, first_name, last_name } = req.body
      const customer = await membership.create({ email, password, first_name, last_name })
      res.status(201).json({
        "status": 0,
        "message": "Registrasi berhasil silahkan login",
        "data": null
      })
    } catch (err) {
      next(err)
    }
  }
  static async login(req,res,next){
    try {      
      const {email, password} = req.body
      const customer = await membership.findOne({
        where:{
          email
        }
      })
      // console.log(customer, "<<<");
      if (!customer) {
        throw({
          name: "Unauthorized",
          message: "Invalid email or password"
        })
      }
      const isPassword = comparePass(password, customer.password)
      // console.log(isPassword, "<<<");

      if (!isPassword) {
        throw({
          name: "Unauthorized",
          message: "Invalid email or password"
        })
      }
      const access_token = generateToken({
        id: customer.id,
        email,
        first_name: customer.first_name,
        last_name: customer.last_name
      })
      

      res.status(200).json({
        "status": 0,
        "message": "Login Sukses",
        "data": {
          "token": access_token
        }
      })
    } catch (err) {
      console.log(err.message, "<<");
      next(err)
    }
  }
  static async getProfile(req,res,next){
    try {
      const data = await membership.findByPk(req.user.id)

      res.status(200).json(
        {
          "status": 0,
          "message": "Sukses",
          "data": { 
            "email" : data.email,
            "first_name" : data.first_name,
            "last_name" : data.last_name,
            "profile_image" : data.profile_image,
           }
        }
      )
  } catch (error) {
      next(error)
  }
  }
  static async updateProfile(req,res,next){
    try {
      
      const {first_name, last_name} = req.body
      console.log(req.body, "<<<", req.user.id );
      const findProfileById = await membership.findByPk(req.user.id)
  
      if (!findProfileById) {
        throw { name: "NotFound", message : "Membership Not found"}
      }
  
      const updatedProfile = await findProfileById.update({first_name, last_name})
      console.log(updatedProfile, "<<");
      res.status(201).json({
        "status": 0,
        "message": "Update Pofile berhasil",
        "data": {
          "email": updatedProfile.email,
          "first_name": updatedProfile.first_name,
          "last_name": updatedProfile.last_name,
          "profile_image": updatedProfile.profile_image
        }
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateProfileIMG(req,res,next){
    try {
      
      const { profile_image } = req.body
      // console.log(req.body, "<<<");
      const findProfileById = await membership.findByPk(req.user.id)
  
      if (!findProfileById) {
        throw { name: "NotFound", message : "Membership Not found"}
      }
  
      const updatedProfileIMG = await findProfileById.update({profile_image})

      res.status(201).json({
        "status": 0,
        "message": "Update Pofile berhasil",
        "data": {
          "email": updatedProfileIMG.email,
          "first_name": updatedProfileIMG.first_name,
          "last_name": updatedProfileIMG.last_name,
          "profile_image": updatedProfileIMG.profile_image
        }
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

