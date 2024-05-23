'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.hasMany(models.Transactions, {foreignKey: "membershipId"});
      Membership.hasMany(models.History, {foreignKey: "membershipId"});
      Membership.hasOne(models.AccountBalances, {foreignKey: "membershipId"});
    }
  }
  Membership.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already in use. Please choose another email.",
      },
      validate: {
        isEmail: {
          msg: "Paramter email tidak sesuai format",
        },
        notNull: {
          msg: "email fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "email field is required. Please fill in all the fields.",
        },
      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "password fields are required. Please fill in all the fields.",
        },
        len: {
          msg: "Minimum password length is 5",
          args: [5],
        },
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "first_name fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "first_name fields are required. Please fill in all the fields.",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "last_name fields are required. Please fill in all the fields.",
        },
        notEmpty: {
          msg: "last_name fields are required. Please fill in all the fields.",
        },
      },
    },
    profile_image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Format Image tidak sesuai",
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Membership',
    hooks: {
      beforeCreate: (membership)=> {
        const newPassword = hashPass(membership.password);
        membership.password = newPassword
      }
    }
  });
  return Membership;
};