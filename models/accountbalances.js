'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccountBalances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccountBalances.belongsTo(models.Membership, {foreignKey: "membershipId"});
    }
  }
  AccountBalances.init({
    membershipId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    account_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'
        },
        min: {
          args: [0],
          msg: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'AccountBalances',
  });
  return AccountBalances;
};
