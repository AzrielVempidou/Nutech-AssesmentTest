'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Service, { foreignKey: "serviceId" });
      Transactions.belongsTo(models.Membership, { foreignKey: "membershipId" });
    }
  }
  Transactions.init({
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    serviceId: DataTypes.INTEGER,
    transaction_type: {
      type: DataTypes.STRING,
      defaultValue: "PAYMENT"
    },
    total_amount: DataTypes.FLOAT,
    membershipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
    hooks: {
      beforeCreate: async (transaction, options) => {

        transaction.transaction_type = "PAYMENT";

        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0].replace(/-/g, '');
       
        transaction.invoice_number = `INV${dateString}-000`;
      },
      afterCreate: async (transaction, options) => {
       
        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        
        const paddedId = String(transaction.id).padStart(3, '0');
        

        transaction.invoice_number = `INV${dateString}-${paddedId}`;
        
        await transaction.save();
      }
    }
  });
  return Transactions;
};
